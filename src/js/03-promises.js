import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else{
        reject({ position, delay });
      }
    }, delay);
  });

}

const onFormSubmit = (e) => {
  e.preventDefault();
  const newData = {};
  const form = e.currentTarget;
  const dataForm = new FormData(form);
  for (const [key, value] of dataForm.entries()) {
    newData[key] = Number(value);
  }

  form.reset();

  for (let i = 1; i <= newData.amount; i += 1) {
    createPromise(i, newData.delay).then(onSuccess).catch(onError);
    newData.delay = newData.delay + newData.step;
  }
}

function onError({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}

function onSuccess({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

formEl.addEventListener('submit', onFormSubmit);
