<template>
  <section class="section-service bg-primary bg-opacity-75 text-white mt-6">
    <div class="services container p-3">
      <ul class="list-unstyled row row-cols-1 row-cols-md-3 my-3">
        <li class="col service d-flex m-auto justify-content-md-center">
          <i class="bi bi-gift my-auto"></i>
          <div class="text ms-5">
            <h4 class="mt-3 fw-bold">精緻包裝</h4>
            <p>送禮自用皆相宜</p>
          </div>
        </li>
        <li class="col service d-flex m-auto justify-content-md-center">
          <i class="bi bi-credit-card-2-back my-auto"></i>
          <div class="text ms-5">
            <h4 class="mt-3 fw-bold">付款方式</h4>
            <p>信用卡刷卡和LINE PAY</p>
          </div>
        </li>
        <li class="col service d-flex m-auto justify-content-md-center">
          <i class="bi bi-truck my-auto"></i>
          <div class="text ms-5">
            <h4 class="mt-3 fw-bold">滿額免運</h4>
            <p>滿1000元享免運費</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss">
.services .service:not(:first-child) {
  border-left: 2px solid #fff;
}

@media screen and (max-width: 768px) {
  .services .service:not(:first-child) {
    border-left: none;
  }
}

.service i {
  font-size: 3.5rem;
}
</style>
