import type { Alpine } from 'alpinejs';

export default function (Alpine: Alpine) {
  Alpine.data('contactForm', (webhookUrl?: string, businessName?: string) => ({
    name: '',
    email: '',
    phone: '',
    message: '',
    status: 'idle',
    errorMessage: '',
    touched: {
      name: false,
      email: false,
      message: false,
    },

    get isNameValid() {
      return this.name.trim().length >= 3;
    },

    get isEmailValid() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(this.email);
    },

    get isMessageValid() {
      return this.message.trim().length >= 10;
    },

    get isFormValid() {
      return this.isNameValid && this.isEmailValid && this.isMessageValid;
    },

    get isSuccess() {
      return this.status === 'success';
    },

    get isNotSuccess() {
      return this.status !== 'success';
    },

    get isSubmitting() {
      return this.status === 'submitting';
    },

    get isError() {
      return this.status === 'error';
    },

    get isSubmitDisabled() {
      return this.status === 'submitting';
    },

    get submitButtonText() {
      return this.status === 'submitting' ? 'Enviando...' : 'Enviar Mensaje';
    },

    get showNameError() {
      return this.touched.name && !this.isNameValid;
    },

    get showEmailError() {
      return this.touched.email && !this.isEmailValid;
    },

    get showMessageError() {
      return this.touched.message && !this.isMessageValid;
    },

    getInputClass(hasError: boolean) {
      const base =
        'text-secondary mt-1.5 w-full rounded-lg border px-4 py-2.5 text-sm placeholder-slate-400 focus:ring-4 focus:outline-none dark:text-white dark:focus:bg-slate-900';
      if (hasError) {
        return `${base} border-rose-500 focus:border-rose-500 focus:ring-rose-500/20 bg-rose-50/10 focus:bg-white`;
      }
      return `${base} border-slate-300 bg-slate-50 focus:border-primary focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:focus:border-primary focus:bg-white dark:focus:bg-slate-900`;
    },

    get nameInputClass() {
      return this.getInputClass(this.showNameError);
    },

    get emailInputClass() {
      return this.getInputClass(this.showEmailError);
    },

    get messageInputClass() {
      return this.getInputClass(this.showMessageError);
    },

    touch(field: 'name' | 'email' | 'message') {
      this.touched[field] = true;
    },

    resetForm() {
      this.status = 'idle';
      this.name = '';
      this.email = '';
      this.phone = '';
      this.message = '';
      this.touched.name = false;
      this.touched.email = false;
      this.touched.message = false;
    },

    async handleSubmit() {
      this.touched.name = true;
      this.touched.email = true;
      this.touched.message = true;

      if (!this.isFormValid) {
        if (!this.isNameValid) {
          document.getElementById('name')?.focus();
        } else if (!this.isEmailValid) {
          document.getElementById('email')?.focus();
        } else if (!this.isMessageValid) {
          document.getElementById('message')?.focus();
        }
        return;
      }

      this.status = 'submitting';
      this.errorMessage = '';

      try {
        const response = await fetch(
          webhookUrl || 'https://n8n.example.com/webhook/contact',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              site: window.location.origin,
              businessName: businessName || '',
              name: this.name,
              email: this.email,
              phone: this.phone,
              message: this.message,
              timestamp: new Date().toISOString(),
            }),
          },
        );

        if (response.ok) {
          this.status = 'success';
          this.resetForm();
        } else {
          throw new Error('Error al procesar la solicitud en el servidor');
        }
      } catch (error) {
        this.status = 'error';
        this.errorMessage =
          error instanceof Error
            ? error.message
            : 'No se pudo enviar el mensaje. Intente de nuevo más tarde.';
      }
    },
  }));
}
