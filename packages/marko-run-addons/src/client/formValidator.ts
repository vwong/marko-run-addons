import { debounce } from "lodash-es";
import type { ValidationChecks } from "../server/validation";

// assumptions:
// * all inputs are nested inside top-level <form> element

export class FormValidator {
  formEl: HTMLFormElement;
  abortController?: AbortController;

  constructor(formEl: HTMLFormElement) {
    this.formEl = formEl;

    const debouncedValidate = debounce(
      (event: Event) => this.validate(event),
      300,
    );
    this.formEl.addEventListener("input", debouncedValidate);
    this.formEl.addEventListener("change", debouncedValidate);
    this.formEl.addEventListener("submit", () => {
      for (const el of this.inputElements) {
        el.dataset.touched = "1";
      }
    });
    this.formEl.addEventListener("focusin", (event: Event) => {
      const el = event.target as HTMLInputElement;
      if (el.validationMessage && el.dataset.touched) {
        el.reportValidity();
      }
    });
    this.formEl.addEventListener("focusout", (event: Event) => {
      const el = event.target as HTMLInputElement;
      el.dataset.touched = "1";
      if (el.dataset.deferredError) {
        el.setAttribute("aria-invalid", "true");
        el.setCustomValidity(el.dataset.deferredError as string);
        delete el.dataset.deferredError;
      }
    });
  }

  validate(event: Event) {
    event.preventDefault();
    this.abortController?.abort();

    // allow abort error handlers to happen first, so use setTimeout
    setTimeout(() => {
      window.onbeforeunload = () => true;
      if (this.submitElement) {
        this.submitElement.disabled = true;
      }
      this.abortController = new AbortController();

      const method = (this.formEl.method || "GET").toUpperCase();
      const params = new URLSearchParams(
        new FormData(this.formEl) as unknown as URLSearchParams,
      );
      const query = method === "POST" ? "" : `?${params.toString()}`;
      const body = method === "POST" ? params : undefined;
      const path =
        this.formEl.getAttribute("action") || window.location.pathname;

      this.formEl.dispatchEvent(new Event("pending"));
      fetch(path + query, {
        body,
        credentials: "same-origin",
        headers: {
          ...(body
            ? {
                "Content-Type": "application/x-www-form-urlencoded",
              }
            : {}),
          "X-Requested-With": "XMLHttpRequest",
          "X-Validate-Only": "true",
        },
        method,
        signal: this.abortController.signal,
      } as RequestInit)
        .then((response) => {
          if (response.status === 400) {
            response.json().then((errors) => {
              this.clearValidity();
              this.setValidity(errors);
              this.formEl.dispatchEvent(new Event("invalid"));
            });
          } else {
            this.clearValidity();
            this.formEl.dispatchEvent(new Event("valid"));
          }
        })
        .catch((error) => {
          if (!this.abortController!.signal.aborted) {
            throw error;
          }
          this.formEl.dispatchEvent(new Event("invalid"));
        })
        .finally(() => {
          window.onbeforeunload = null;
          if (this.submitElement) {
            this.submitElement.disabled = false;
          }
          this.abortController = undefined;
        });
    }, 0);
  }

  clearValidity() {
    for (const el of this.inputElements) {
      el.setCustomValidity("");
      el.setAttribute("aria-invalid", "false");
    }
  }

  setValidity(errors: ValidationChecks[]) {
    errors.forEach(({ name, message }) => {
      const el = this.inputElements.find((i) => i.name === name);
      if (el) {
        if (el.dataset.touched) {
          el.setAttribute("aria-invalid", "true");
          el.setCustomValidity(message as string);

          if (el.dataset.touched && el === document.activeElement) {
            el.reportValidity();
          }
        } else {
          el.dataset.deferredError = message;
        }
      }
    });
  }

  get inputElements(): HTMLInputElement[] {
    return [
      ...Array.from(this.formEl.querySelectorAll("input")),
      ...Array.from(this.formEl.querySelectorAll("select")),
      ...Array.from(this.formEl.querySelectorAll("textarea")),
    ] as HTMLInputElement[];
  }

  get submitElement(): HTMLButtonElement {
    return this.formEl.querySelector(`[type="submit"]`) as HTMLButtonElement;
  }
}
