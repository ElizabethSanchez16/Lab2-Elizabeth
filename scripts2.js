//no funciona muy bien que digamos alv, usemos scripts normal
$(document).ready(function() {
    // ===== Cargar publicaciones en la página principal (index.html) =====
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

    // ===== Cargar publicación individual y comentarios (blog.html) =====
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    if (postId) { // Solo ejecutar si estamos en blog.html (tiene un ID)
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
            commentsList.empty(); // Limpiar comentarios existentes antes de agregar
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

        // Enviar comentario (solo una vez)
        $("#add-comment-form").off("submit").on("submit", function(e) {
            e.preventDefault();
            const newComment = {
                postId: postId,
                content: $("#comment-content").val(),
                date: new Date().toISOString().split('T')[0]
            };

            $.ajax({
                url: "http://localhost:3000/comments",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(newComment),
                success: function(response) {
                    console.log("Comment added:", response);
                    location.reload(); // Recargar para mostrar el nuevo comentario
                },
                error: function(error) {
                    console.error("Error adding comment:", error);
                }
            });
        });
    }

    // ===== Enviar nueva publicación (add-post.html) =====
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
});