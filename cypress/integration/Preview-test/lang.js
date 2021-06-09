import { ArticlePage } from '../../page-objects/article-page.js'
import data from '../../page-objects/data'
import { msg } from '../../../src/i18n'

const articlePage = new ArticlePage()
const  url = data.url 

url.forEach((url)=>{


	describe("Article View " + url,()=>{

		beforeEach(()=>{
			cy.visit(url)
		})

		it("Checking the Span Classname on hovering",()=>{
			
			// Finding all the Wikipreview tagged Span
			articlePage.span().each(($span)=>{
				// Triggering the mouseenter event to make preview visible
				cy.wrap($span).trigger('mouseenter',{force: true})

				// Chec
				articlePage.preview().then(($tag=>{
					// Extracting the language used
					const lang = $tag.attr('lang')
					// Checking the preview Header wiki contains language specific image
					articlePage.previewHeaderWiki().should('have.class','wikipediapreview-header-wordmark-'+lang)

					// Check if Footer with "Continue reading" exists
					// If it exist, check if the "continue reading" is present in that particular language
					const flag = $tag.find('.wikipediapreview-footer-cta-readmore').length

					if(articlePage.readmore().length!==0){
						articlePage.readmore().should('contain',msg( lang, 'continue-reading' ))
					}
					
				}))


			})
		})

	})

})