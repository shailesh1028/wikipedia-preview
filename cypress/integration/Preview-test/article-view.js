import { ArticlePage } from '../../page-objects/article-page.js'
import data from '../../page-objects/data'

const articlePage = new ArticlePage()
const  url = data.url 

url.forEach((url)=>{


	describe("Article View",()=>{

		beforeEach(()=>{
			cy.visit(url)
		})

		it("Checking the Span Classname",()=>{
			
			articlePage.span().should('have.class','wmf-wp-with-preview')
		})

		it("Checking the Css property",()=>{
			
			articlePage.span().then(($span)=>{
				cy.wrap($span).should('be.visible')
				cy.wrap($span).should('have.css','font-style').and('equal','normal')
				cy.wrap($span).should('have.css','font-weight').and('equal','400')
				cy.wrap($span).should('have.css','color').and('equal','rgb(32, 33, 34)')
				cy.wrap($span).should('have.css','background-color').and('equal','rgb(234, 243, 255)')
				
			})
		})
	})

})