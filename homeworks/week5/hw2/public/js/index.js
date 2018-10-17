document.querySelectorAll('.create-comment__btn').forEach(btn => {
  btn.addEventListener('click', e => {

    const topic = e.target.previousElementSibling.previousElementSibling.previousElementSibling.value;
    const content = e.target.previousElementSibling.previousElementSibling.value;
    const parentId = e.target.previousElementSibling.value;

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.responseText === 'ok') document.location.href = '/';
      }
    }
    xhr.open('POST', '/insert_comment');
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(`topic=${topic}&content=${content}&parentId=${parentId}`);
  })
})