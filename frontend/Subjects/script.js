const addButton = document.getElementById("add-button");
const topicList = document.getElementById("topic-list");

addButton.addEventListener("click", () => {
    const category = document.getElementById("category").value;
    const topic = document.getElementById("topic").value;
    if (category && topic) {
        const listItem = document.createElement("li");
        listItem.classList.add("topic-item");
        listItem.innerHTML = `
        <span>${category} - ${topic}</span>
        <span class="delete-icon">🗑️</span>
      `;
        topicList.appendChild(listItem);

        const deleteIcon = listItem.querySelector(".delete-icon");
        deleteIcon.addEventListener("click", () => {
            topicList.removeChild(listItem);
        });

        document.getElementById("topic").value = "";
    }
});
