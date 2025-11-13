<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Безопасное получение данных
    $name = htmlspecialchars(trim($_POST["name"]));
    $phone = htmlspecialchars(trim($_POST["phone"]));
    $message = htmlspecialchars(trim($_POST["message"]));

    // Кому отправляем
    $to = "mburituslugi@perm.permkrai.ru"; 

    // Заголовки и содержимое письма
    $subject = "Новое сообщение с сайта";
    $body = "Имя: $name\nТелефон: $phone\nСообщение:\n$message";
    $headers = "From: no-reply@yourdomain.ru\r\nContent-Type: text/plain; charset=UTF-8\r\n";

    // Отправка
    if (mail($to, $subject, $body, $headers)) {
        echo "<script>alert('✅ Сообщение успешно отправлено!');window.location.href=document.referrer;</script>";
    } else {
        echo "<script>alert('❌ Ошибка при отправке. Попробуйте позже.');window.location.href=document.referrer;</script>";
    }
}
?>
