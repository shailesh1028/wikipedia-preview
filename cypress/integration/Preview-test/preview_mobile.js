import { ArticlePage } from '../../page-objects/article-page.js'
import data from '../../page-objects/data'

const articlePage = new ArticlePage()
const  url = data.url 
const viewport = data.view

url.forEach((url)=>{


	describe("Article View " + url,()=>{

		beforeEach(()=>{
			cy.visit(url)
		})

		it("Checking the peview visbility on hovering",()=>{
			
			articlePage.span().each(($span)=>{
				cy.log($span.text())
				// Mouse Enter event triggered
				cy.wrap($span).trigger('mouseenter',{force: true})
				// Checking the popup div and its content visibility
				articlePage.popup().should('be.visible')
				articlePage.preview().should('be.visible')
				articlePage.previewHeader().should('be.visible')
				cy.wait(1000)
				
				// Checking if the preview has header-image
				// If it exist, then check its visibility and url
				articlePage.previewHeader().then(($body)=>{

					const flag = $body.find('.wikipediapreview-header-image').length

					if(flag!==0){
						articlePage.previewImage().then(($url)=>{
							cy.log('Image Exist')
							expect($url).to.be.visible
							cy.wrap($url).ImageUrlCheck($url)
						})
					}
				})
				
				//Checking the previewheader visible and it's url 
				articlePage.previewHeaderWiki().then(($url)=>{
					expect($url).to.be.visible
					cy.wrap($url).ImageUrlCheck($url)
				})
				
				// Check close button,footer and body visibility
				articlePage.closebtn().should('be.visible')
				articlePage.previewBody().should('be.visible')
				articlePage.previewFooter().should('be.visible')

			})
		})

		it.only("Checking the peview gallery",()=>{
			
			articlePage.span().each(($span)=>{
				cy.log($span.text())

				cy.wrap($span).trigger('mouseenter',{force: true})
				
				cy.wait(1000)
				
				// Check if preview Footer exists with "Continue reading" div
				articlePage.previewHeader().then(($body)=>{

					const flag = Cypress.$('.wikipediapreview-footer-cta-readmore').css('display')
					cy.log(flag)
					if(flag!=='none'){
						cy.log('div found')
						articlePage.readmore().click()
				
					}
					// Ceck if the Preview gallery exists
					const flg = $body.find('.wikipediapreview-gallery').length
					if(flg!==0){
						cy.log(flg)
						articlePage.previewGallery().scrollIntoView().should('be.visible')

						// Check ini=dividual image and its url in gallery
						articlePage.previewGalleryImage().each(($img)=>{

							cy.wrap($img).scrollIntoView().should('be.visible')
							cy.wrap($img).should('have.css', 'background-image')
						})
					}
				})

				

			})
		})
	})

})