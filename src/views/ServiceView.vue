<template>
  <section class="section-top mb-5">
    <div class="bg-top"></div>
  </section>
  <section class="container">
    <h1 class="text-center mb-4">常見問題</h1>
    <div class="p-4 server">
      <h2 class="mb-4">購物流程</h2>
      <div class="text px-sm-5">
        <ol>
          <li>挑選商品</li>
          <li>加入購物車</li>
          <li>繼續購物或確認結帳</li>
          <li>填寫收貨人資料</li>
          <li>確認付款結帳</li>
          <li>完成</li>
        </ol>
      </div>
    </div>
    <div class="p-4 server">
      <h2 class="mb-4">注意事項</h2>
      <div class="text px-sm-5">
        <ul>
          <li>盒內放有乾冰，請小心處理，否則可能引起危險。</li>
          <li>切勿用手接觸乾冰，否則有可能導致皮膚凍傷</li>
          <li>切勿吞嚥乾冰或把乾冰放入食物或飲品中</li>
        </ul>
      </div>
    </div>
    <div class="p-4 server">
      <h2 class="mb-4">配送方式</h2>
      <div class="text px-sm-5">
        <ul>
          <li>配送僅限台灣本島。</li>
          <li>
            確認訂單後約七個工作天(不含例假日)送達，訂單成立後會有專人致電訂購人確認。
          </li>
          <li>單筆訂單滿1000元即可享免運費</li>
        </ul>
      </div>
    </div>
    <div class="p-4 server">
      <h2 class="mb-4">售後服務</h2>
      <div class="text px-sm-5">
        <ul>
          <li>退換貨須知:</li>
          <li>訂購商品後，在尚未出貨之前，您仍可以申請取消訂單</li>
          <li>本商店商品無7天鑑賞期，食品貨物提領後恕不提供退換貨服務</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.bg-top {
  height: 40vh;
  background-image: url('https://images.unsplash.com/photo-1550254469-e77c18c9252b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
.pic {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top center;
}

.server{
  margin-bottom: 2rem;
  border-bottom: 3px dashed #839EA9;
}
</style>

<script>
export default {
  name: 'ServiceView'
}
</script>
