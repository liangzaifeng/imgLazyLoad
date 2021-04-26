

    /**
    * 
    * @param {Object} option 
    * @param {Number} option.loadNum 图片预加载 浏览器可视屏幕高度的屏数
    * @param {Number} option.errorSrc 图片加载失败路径
    * @param {Number} option.loadingSrc 图片加载中路径
    * @return {*} 无
    */
     function imgLazyLoad({
      loadNum,
      errorSrc,
      loadingSrc
  } = {
          loadNum: 1,
          errorSrc: './img/error.jpg',
          loadingSrc: './img/loading.gif'
      }) {

      let imgListEl = document.querySelectorAll('img')
      imgListEl = [].slice.call(imgListEl)
      const len = imgListEl.length
      let count = 0
      const windowHeight = window.innerHeight * loadNum
      imgListEl.forEach(img => img.src = loadingSrc)

      function fn() {
          let delIndex = []
          imgListEl.forEach((imgEl, i) => {
              const rect = imgEl.getBoundingClientRect()

              if (Math.abs(rect.top) < windowHeight) {
                  const newImg = new Image()
                  newImg.src = imgEl.dataset.lazy
                  newImg.onload = () => {
                      imgEl.src = imgEl.dataset.lazy
                  }
                  newImg.onerror = () => {
                      imgEl.src = errorSrc
                  }
                  count++
                  delIndex.push(i)
              }
          })
          imgListEl = imgListEl.filter((v, i) => !delIndex.includes(i))

          if (len === count) {
              window.removeEventListener('scroll', fn)
          }
      }
      
      fn()
      window.addEventListener('scroll', fn)
  }