
$(document).ready(function() {
    // Cargar publicaciones al iniciar la página
    $.get("http://localhost:3000/posts", function(data) {
        const postsContainer = $("#posts-container");
        data.forEach(post => {
            const postHtml = `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${post.title}</h5>
                            <p class="card-text">${post.content}</p>
                            <a href="blog.html?id=${post.id}" class="btn btn-primary">Lire plus</a>
                        </div>
                    </div>
                </div>
            `;
            postsContainer.append(postHtml);
        });
    });
});

//Agregar lógica para enviar el formulario
$("#add-post-form").submit(function(e) {
    e.preventDefault();
    const newPost = {
        title: $("#title").val(),
        author: $("#author").val(),
        content: $("#content").val(),
        date: new Date().toISOString().split('T')[0]
    };

    $.post("http://localhost:3000/posts", newPost, function() {
        window.location.href = "index.html";
    });
});

//Cargar publicación y comentarios
$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    // Cargar publicación
    $.get(`http://localhost:3000/posts/${postId}`, function(post) {
        const postHtml = `
            <h1>${post.title}</h1>
            <p>${post.content}</p>
            <p><strong>Auteur:</strong> ${post.author}</p>
            <p><strong>Date:</strong> ${post.date}</p>
        `;
        $("#post-content").html(postHtml);
    });

    // Cargar comentarios
    $.get(`http://localhost:3000/comments?postId=${postId}`, function(comments) {
        const commentsList = $("#comments-list");
        comments.forEach(comment => {
            const commentHtml = `
                <div class="card mb-3">
                    <div class="card-body">
                        <p>${comment.content}</p>
                        <p><small>${comment.date}</small></p>
                    </div>
                </div>
            `;
            commentsList.append(commentHtml);
        });
    });

    // Enviar comentario
    $("#add-comment-form").submit(function(e) {
        e.preventDefault();
        const newComment = {
            postId: postId,
            content: $("#comment-content").val(),
            date: new Date().toISOString().split('T')[0]
        };

        $.post("http://localhost:3000/comments", newComment, function() {
            location.reload(); // Recargar la página para mostrar el nuevo comentario
        });
    });
});

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');
console.log("Post ID:", postId); // Verifica que esto muestre el ID correcto

$.post("http://localhost:3000/comments", newComment, function(response) {
    console.log("Comment added:", response); // Verifica la respuesta del servidor
    location.reload();
}).fail(function(error) {
    console.error("Error adding comment:", error); // Muestra errores en la consola
});



$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    console.log("Post ID:", postId); // Verifica que el ID se obtenga correctamente

    // Cargar publicación
    $.get(`http://localhost:3000/posts/${postId}`, function(post) {
        const postHtml = `
            <h1>${post.title}</h1>
            <p>${post.content}</p>
            <p><strong>Auteur:</strong> ${post.author}</p>
            <p><strong>Date:</strong> ${post.date}</p>
        `;
        $("#post-content").html(postHtml);
    });

    // Cargar comentarios
    $.get(`http://localhost:3000/comments?postId=${postId}`, function(comments) {
        const commentsList = $("#comments-list");
        comments.forEach(comment => {
            const commentHtml = `
                <div class="card mb-3">
                    <div class="card-body">
                        <p>${comment.content}</p>
                        <p><small>${comment.date}</small></p>
                    </div>
                </div>
            `;
            commentsList.append(commentHtml);
        });
    });

    // Enviar comentario
    $("#add-comment-form").submit(function(e) {
        e.preventDefault();
        const newComment = {
            postId: postId,
            content: $("#comment-content").val(),
            date: new Date().toISOString().split('T')[0]
        };

        $.post("http://localhost:3000/comments", newComment, function(response) {
            console.log("Comment added:", response); // Verifica la respuesta
            location.reload(); // Recargar la página para mostrar el nuevo comentario
        }).fail(function(error) {
            console.error("Error adding comment:", error); // Muestra errores
        });
    });
});