<?php
require '../includes/db.php';
include '../includes/header.php';

$category = 'coffins';
$stmt = $pdo->prepare("SELECT * FROM products WHERE category = ?");
$stmt->execute([$category]);
$products = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<main>
  <div class="container">
    <h2>Гробы</h2>
    <div class="products-grid">
      <?php foreach ($products as $product): ?>
        <div class="product-item">
          <img src="../<?= htmlspecialchars($product['image']); ?>" alt="<?= htmlspecialchars($product['name']); ?>">
          <h3><?= htmlspecialchars($product['name']); ?></h3>
          <p><?= htmlspecialchars($product['description']); ?></p>
          <p><strong><?= number_format($product['price'], 2, ',', ' '); ?> ₽</strong></p>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</main>
<?php include '../includes/footer.php'; ?>
