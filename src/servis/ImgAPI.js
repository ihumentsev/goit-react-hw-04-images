function fetchImg(name, page) {
  return fetch(
    `https://pixabay.com/api/?q=${name}&page=1&key=29464546-8020741a37deac58a15567c18&image_type=photo&orientation=horizontal&per_page=12&page=${page}`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(
        `По запросу ${name} ничего не найдено! Попробуйте выполнить поиск по другому ключевому слову.`
      )
    );
  });
}
const api = {
  fetchImg,
};
export default api;
