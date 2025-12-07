// Helper to find password forms
function findPasswordForms() {
  const forms = [];
  const passwordInputs = document.querySelectorAll('input[type="password"]');

  passwordInputs.forEach(pwdInput => {
    // Find closest form or container
    const form = pwdInput.form;
    let usernameInput = null;

    if (form) {
      // Look for text/email input before the password in the same form
      const inputs = Array.from(form.querySelectorAll('input'));
      const pwdIndex = inputs.indexOf(pwdInput);

      for (let i = pwdIndex - 1; i >= 0; i--) {
        const input = inputs[i];
        if (input.type === 'text' || input.type === 'email') {
          usernameInput = input;
          break;
        }
      }
    } else {
      // loose detection if no form tag
    }

    if (usernameInput) {
      // Mark them for easy debugging/identification
      forms.push({
        usernameField: usernameInput,
        passwordField: pwdInput
      });
    }
  });

  return forms;
}

// Listen for messages from Popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "fill_creds") {
    const forms = findPasswordForms();
    if (forms.length > 0) {
      // Fill the first matching form for now
      // In a real app, you'd check which form is visible or match the specific user request
      const target = forms[0];
      target.usernameField.value = request.username;
      target.passwordField.value = request.password;

      // Trigger events to simulate user input (crucial for React/Angular apps)
      target.usernameField.dispatchEvent(new Event('input', { bubbles: true }));
      target.passwordField.dispatchEvent(new Event('input', { bubbles: true }));

      sendResponse({ status: "success", filled: true });
    } else {
      sendResponse({ status: "error", message: "No password form found" });
    }
  }
});