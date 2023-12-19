/* Loader event for Spinner component */
// spinner.js
export function startSpinner() {
    const spinner = document.querySelector('.spinner');
    spinner.classList.remove('hidden');
    spinner.classList.add('flex');
  
    return function stop() {
      spinner.classList.remove('flex');
      spinner.classList.add('hidden');
    };
  }