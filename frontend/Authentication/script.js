const entrarBtn = document.getElementById("entrarBtn");

entrarBtn.addEventListener("click", function () {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

    // Aqui você pode adicionar a lógica de autenticação com JavaScript
    // Por exemplo, você pode verificar se os campos não estão vazios
    // e fazer uma ação de acordo com isso.

    if (nome && email) {
        alert(`Bem-vindo, ${nome} (${email})!`);
    } else {
        alert("Por favor, preencha todos os campos.");
    }
});
