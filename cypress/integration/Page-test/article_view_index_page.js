import { ArticlePage } from '../../page-objects/article-page.js'

const articlePage = new ArticlePage()

describe("First Test", function(){

	beforeEach(() => {
    	cy.navigateToHomePage()
  	})

	
	
	it("Checking the image",function(){

		
		cy.get('.item').each(($div)=>{


			cy.wrap($div).children().should('have.attr','href')
			cy.wrap($div).find('a').children().then(($item)=>{
				
				cy.wrap($item).eq(0).should('have.class','image')
				cy.wrap($item).eq(1).should('have.class','title')
				cy.wrap($item).eq(2).should('have.class','subtitle')
				cy.wrap($item).eq(3).should('have.class','content')
		
			})
		
		})
		
	})

	it.only("Checking the classname",function(){

		
		articlePage.item().each(($div)=>{

			cy.wrap($div).get('.image').find('.cover').should('have.css','background-image')
			.and('contain',"/img/")
		
		})
		
	})

	
	it("Checking the title",function(){

			
		cy.get('.item').each(($div)=>{

			cy.wrap($div).find('.title').then(($title)=>{
				cy.wrap($title).should('be.visible')
				cy.wrap($title).should('have.css','font-style').and('equal','normal')
				cy.wrap($title).should('have.css','font-weight').and('equal','700')
				cy.wrap($title).should('have.css','color').and('equal','rgb(32, 33, 34)')
			})
		
		})
			
	})



	it("Checking the subtitle",function(){

			
		cy.get('.item').each(($div)=>{

			cy.wrap($div).find('.subtitle').then(($subt)=>{
				cy.wrap($subt).should('be.visible')
				cy.wrap($subt).should('have.css','font-style').and('equal','normal')
				cy.wrap($subt).should('have.css','font-weight').and('equal','400')
				cy.wrap($subt).should('have.css','color').and('equal','rgba(0, 0, 0, 0.7)')
			})
		
		})


			
	})

})

