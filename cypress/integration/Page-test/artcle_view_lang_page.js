import { ArticlePage } from '../../page-objects/article-page.js'
import data from '../../page-objects/data'

const articlePage = new ArticlePage()
const url = data.url

url.forEach((url)=>{

	describe("Sample Test on " + url, function(){

		beforeEach(() => {
	    	cy.navigateToHomePage(url)
	  	})

		
		it("Header Check",function(){

			articlePage.header().then(($tag)=>{
				// URL of index page check
				cy.wrap($tag).parent().should('have.attr','href').and('match',/index/)
				// CSS Property Check
				expect($tag).to.have.text('Wikipedia Preview demo')
				expect($tag).to.have.css('color', 'rgb(0, 62, 107)')
				expect($tag).to.have.css('font-size', '32px')

			})			

		})


		it("Image check",function(){

			cy.get('.container > .cover').then(($tag)=>{
				cy.ImageUrlCheck($tag)
			})
			
		})

		
		it("Title Check",function(){

			articlePage.title().then(($tag)=>{
				expect($tag).to.have.css('color', 'rgb(32, 33, 34)')
				expect($tag).to.have.css('font-size', '20px')
			
			})
				
		})


		it("Content check",function(){

			articlePage.content().children().each(($tag)=>{
				expect($tag).to.have.css('color', 'rgb(32, 33, 34)')
				expect($tag).to.have.css('font-size', '16px')	
			})
	
		})

		it("Footer Check",function(){
			
			articlePage.footer().children().then(($tag)=>{
				expect($tag).to.have.css('background-color', 'rgba(255, 255, 255, 0)')
				expect($tag).to.have.css('font-weight', '400')

			})			

		})

	})
})

