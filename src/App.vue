<template>
  <div class="container">
    <main class="shadow-lg rounded">
      <img v-show="imageSrc" :src="imageSrc" :alt="pokemon" class="pokemon__image" />

      <h1 class="pokemon__data">
        <span class="pokemon__number">{{ pokemon?.id ? pokemon.id : null }}</span> -
        <span class="pokemon__name">{{ pokemon?.name ? pokemon.name : msgError }}</span>
      </h1>

      <form class="form" @submit.prevent="getPokemon(search)">
        <input
          v-model="search"
          type="search"
          class="input__search"
          placeholder="Name or Number"
          required
        />
      </form>

      <div class="buttons">
        <button class="button btn-prev" @click="handlePre">&lt; Prev</button>
        <button class="button btn-next" @click="handleNext">Next &gt;</button>
      </div>

      <img src="@/assets/images/pokedex.png" alt="pokedex" class="pokedex" />
    </main>
  </div>
</template>

<script>
import pokeApi from '@/apis/models/pokeApi.js'
export default {
  data() {
    return {
      pokemon: null,
      search: 'ditto',
      imageSrc: '',
      msgError: '',
      currentId: 123
    }
  },

  created() {
    this.getPokemon(this.search)
  },

  methods: {
    async getPokemon(search) {
      try {
        const response = await pokeApi.get(search)
        if (response.status === 200) {
          this.pokemon = response.data
          this.currentId = this.pokemon.id
          this.imageSrc =
            response.data.sprites.versions['generation-v']['black-white'].animated.front_default
        }
      } catch (error) {
        this.imageSrc = ''
        this.pokemon = null
        this.msgError = error.response.data
        this.currentId = null
        return error
      }
    },
    async getAllPokemon() {
      try {
        const response = await pokeApi.getAll()
        return response
      } catch (error) {
        console.log(error)
      }
    },
    async handlePre() {
      const { data } = await this.getAllPokemon()
      const { count } = data
      if (this.currentId === 1) {
        this.currentId === count
      } else {
        this.currentId--
      }

      this.getPokemon(this.currentId)
      this.search = ''
    },
    async handleNext() {
      const { data } = await this.getAllPokemon()
      const { count } = data

      if (this.currentId === count) {
        this.currentId = 1
      } else {
        this.currentId++
      }

      this.getPokemon(this.currentId)
      this.search = ''
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Oxanium', cursive;
}

body {
  text-align: center;
  background: linear-gradient(to bottom, #6ab7f5, #fff);
  min-height: 100vh;
}

main {
  display: inline-block;
  margin-top: 2%;
  padding: 15px;
  position: relative;
}

.pokedex {
  width: 100%;
  max-width: 425px;
}

.pokemon__image {
  position: absolute;
  bottom: 55%;
  left: 50%;
  transform: translate(-63%, 20%);
  height: 18%;
}

.pokemon__data {
  position: absolute;
  font-weight: 600;
  color: #aaa;
  top: 54.5%;
  right: 27%;
  font-size: clamp(8px, 5vw, 25px);
}

.pokemon__name {
  color: #3a444d;
  text-transform: capitalize;
}

.form {
  position: absolute;
  width: 65%;
  top: 65%;
  left: 13.5%;
}

.input__search {
  width: 100%;
  padding: 4%;
  outline: none;
  border: 2px solid #333;
  border-radius: 5px;
  font-weight: 600;
  color: #3a444d;
  font-size: clamp(8px, 5vw, 1rem);
  box-shadow:
    -3px 4px 0 #888,
    -5px 7px 0 #333;
}

.buttons {
  position: absolute;
  bottom: 10%;
  left: 50%;
  width: 65%;
  transform: translate(-57%, 0);
  display: flex;
  gap: 20px;
}

.button {
  width: 50%;
  padding: 4%;
  border: 2px solid #000;
  border-radius: 5px;
  font-size: clamp(8px, 5vw, 1rem);
  font-weight: 600;
  color: white;
  background-color: #444;
  box-shadow:
    -2px 3px 0 #222,
    -4px 6px 0 #000;
}

.button:active {
  box-shadow: inset -4px 4px 0 #222;
  font-size: 0.9rem;
}
</style>
