import { describe, it, beforeEach, expect } from 'vitest'
import { randomUUID } from 'node:crypto'
import { InMemoryRecipeRepository } from '../../../../repositories/in-memory-repository/in-memory-recipe-repository'

describe('Get Favorite Recipes By User.', () => {
  let recipeRepository: InMemoryRecipeRepository

  beforeEach(() => {
    recipeRepository = new InMemoryRecipeRepository()
  })

  it('should return recipes liked by user', async () => {
    const userId = randomUUID()

    const recipe = await recipeRepository.create({
      id:randomUUID(),
      recipe_title: 'Bolo',
      description: 'descricao',
      recipe_image: 'img',
      cook_time: '10min',
      servings: '4',
      ingredients: [],
      cook_instructions: [],
      user: {
        connect: { id: userId }
      }
    })

    recipeRepository.favorites.push({
        userId,
        recipesId: recipe.id,
        id: randomUUID()
    })

    const result = await recipeRepository.findManyRecipesByFavorite(userId)

    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(recipe.id)
  })
})
