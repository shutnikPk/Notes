document.addEventListener("click", (event) => {

  switch(event.target.dataset.type) {
    case 'remove':  
    const id = event.target.dataset.id;
    console.log(id);
    removeFromId(id).then(() => {
      event.target.closest("li").remove();
    });
      break
  
    case 'edit':  
      console.log('helloWorld!')
    break
  
    default:
      break
  }

});
async function removeFromId(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}
