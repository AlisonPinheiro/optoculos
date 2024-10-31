import "../scss/index.scss";

function sendEmailToMasterData(email, nome, whatsapp, cidade) {
  var body = {
    email: email,
    nome: nome,
    celular: whatsapp,
    cidade: cidade,
  };

  return fetch("/api/dataentities/FR/documents", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/vnd.vtex.ds.v10+json",
    },
    body: JSON.stringify(body),
  }).then((response) => {
    if (!response.ok) {
      // Caso a resposta não seja "ok", lança um erro
      return Promise.reject(response);
    }
    return response.json(); // Converte a resposta em JSON
  });
}

function checkUserInMasterData(email) {
  return $.ajax({
    url: `/api/dataentities/FR/search?_where=email=${email}`,
    method: "GET",
    contentType: "application/json",
    headers: {
      Accept: "application/vnd.vtex.ds.v10+json",
    },
    success: function (data) {
      return data.length > 0;
    },
    error: function (err) {
      console.error("Erro ao verificar o usuário:", err);
      return false;
    },
  });
}

$(document).ready(function () {
  $("body").on("click", ".faq-section__question", (element) => {
    $(".faq-section__item").removeClass("is-active");
    $(element.target).parent().addClass("is-active");
  });
  // Função de envio de dados
  function handleFormSubmit(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    // Identificar o formulário que foi submetido
    var $form = $(event.target);
    var email = $form.find('input[type="email"]').val();
    var nome = $form.find('input[placeholder="Nome"]').val();
    var whatsapp = $form.find('input[placeholder="Número do WhatsApp"]').val();
    var cidade = $form.find('input[placeholder="Cidade de Interesse"]').val();

    // Função para verificar se o usuário já existe no Master Data
    checkUserInMasterData(email).then(function (userExists) {
      if (!userExists.length > 0) {
        // Se o usuário não existir, enviar os dados para o Master Data
        sendEmailToMasterData(email, nome, whatsapp, cidade)
          .then(function (response) {
            // Exibe um alerta de sucesso com SweetAlert
            Swal.fire({
              title: "Cadastro realizado com sucesso!",
              text: "Seus dados foram enviados com sucesso.",
              icon: "success",
              confirmButtonText: "Ok",
            });
          })
          .catch(function (error) {
            console.error("Erro ao enviar os dados:", error);

            // Exibe um alerta de erro com SweetAlert
            Swal.fire({
              title: "Erro!",
              text: "Ocorreu um erro ao enviar os dados. Tente novamente.",
              icon: "error",
              confirmButtonText: "Ok",
            });
          });
      } else {
        // Exibe um alerta informando que o e-mail já está cadastrado
        Swal.fire({
          title: "E-mail já cadastrado!",
          text: "Este e-mail já está cadastrado no sistema.",
          icon: "warning",
          confirmButtonText: "Ok",
        });
      }
    });
  }

  $("body").on("submit", ".form", handleFormSubmit);
});
