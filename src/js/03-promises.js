import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  delayMs: document.querySelector('[name="delay"]'),
  stepMs: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
};

refs.form.addEventListener('submit', evt => {
  evt.preventDefault();

  let delay = Number(refs.delayMs.value);
  let step = Number(refs.stepMs.value);
  let amount = Number(refs.amount.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(value => {
        Notiflix.Notify.success(value);
      })
      .catch(error => {
        Notiflix.Notify.failure(error);
      });
    delay += step;
  }
  refs.form.reset();
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
