const $elements = {
  success: document.getElementById("successBox"),
  error: document.getElementById("errorBox"),
  loading: document.getElementById("loadingBox"),
};

$elements.success.addEventListener("click", hideSuccess);
$elements.error.addEventListener("click", hideError);

function hideSuccess() {
  $elements.success.parentNode.style.display = "none";
}

function hideError() {
  $elements.error.parentNode.style.display = "none";
}

export default {
  showSuccess: (message) => {
    $elements.success.parentNode.style.display = "block";
    $elements.success.textContent = message;

    setTimeout(hideSuccess, 1000);
  },
  showError: (message) => {
    $elements.error.parentNode.style.display = "block";
    $elements.error.textContent = message;

    setTimeout(hideError, 1000);
  },
  showLoading: () => {
    $elements.loading.parentNode.style.display = "block";
    $elements.loading.textContent = "Loading...";
  },
  hideLoading: () => {
    $elements.loading.parentNode.style.display = "none";
  },
};
