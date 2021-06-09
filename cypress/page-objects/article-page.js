export class ArticlePage {
  
  item () {
    return cy.get('.item')
  }

  title () {
    return cy.get('.title')
  }

  span(){
    return cy.get('span[data-wikipedia-preview]')
  }

  header () {
    return cy.get('.header')
  }

  content () {
    return cy.get('.container').find('.content')
  }
  footer () {
    return cy.get('.footer')
  }

  // Wikipedia Preview Elements

  popup () {
    return cy.get('.wp-popup')
  }

  preview(){
    return cy.get('.wikipediapreview')
  }

  previewHeader () {
    return cy.get('.wikipediapreview-header')
  }

  previewImage(){
    return cy.get('.wikipediapreview-header > .wikipediapreview-header-image')
  }

  previewHeaderWiki () {
    return cy.get('.wikipediapreview-header > .wikipediapreview-header-wordmark')
  }

  closebtn () {
    return cy.get('.wikipediapreview-header > .wikipediapreview-header-closebtn')
  }

  previewBody () {
    return cy.get('.wikipediapreview-body')
  }
  previewFooter () {
    return cy.get('.wikipediapreview-footer')
  }

  previewGallery () {
    return cy.get('.wikipediapreview-gallery')
  }

  readmore () {
    return cy.get('.wikipediapreview-footer-cta-readmore') 
  }

  previewGalleryImage () {
    return cy.get('.wikipediapreview-gallery-image')
  }
  // footerLinkToWikipedia () {
  //   return cy.get('.browser .external')
  // }

  // galleryImage () {
  //   return cy.get('div.gallery-view > div.img > img')
  // }

  // galleryPopupHeader () {
  //   return cy.get('div.gallery-about > div.header')
  // }

  // selectOptionFromActionsMenu (option) {
  //   var entered = false
  //   cy
  //     .get('.article-actions-button')
  //     .each(($el, index, $list) => {
  //       if ($el.attr('data-action') === option) {
  //         cy.enter()
  //         entered = true
  //       } else {
  //         if (!entered) {
  //           cy.rightArrow()
  //         }
  //       }
  //     })
  // }

  // getActionsSectionButton (option) {
  //   return cy.get('div[class="article-actions-button"][data-action="' + option + '"]')
  // }

  // selectOptionFromArticleMenu (option) {
  //   cy.clickMenuButton()
  //   articleMenuPage.selectOptionFromArticleMenu(option)
  // }

  // getArticleText () {
  //   return cy.get('.article-content')
  // }

  // getDownArrowIndicator () {
  //   return cy.get('div.indicator>img')
  // }
}
