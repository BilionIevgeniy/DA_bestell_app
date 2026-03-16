export function generateTemplate(item) {
  const { id } = item;
  return /*html*/ `
     <div class="card" data-id="${id}">
        
      </div>
  `;
}
