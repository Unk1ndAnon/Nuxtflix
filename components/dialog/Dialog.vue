<template>
  <v-dialog v-model="show" max-width="900px">
    <v-card id="dialog">
      <v-img
        id="backgdrop"
        height="auto"
        width="900"
        :src="imgURL3 + this.items.backdrop_path"
        gradient="to top, rgba(230,230,230,1), rgba(230,230,230,0.4)"
      >
        <v-btn class="btn_trailer" icon dark flat @click.stop="show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-img>
      <div class="container mx-auto md:flex px-6">
        <v-img
          id="poster"
          width="250"
          contain
          class="hidden-sm-and-down"
          :src="imgURL2 + this.items.poster_path"
        ></v-img>
      </div>
      <v-row>
        <v-col>
          <v-rating
            id="rating"
            :value="this.items.vote_average / 2"
            background-color="purple lighten-3"
            color="purple"
            readonly
            half-increments
          ></v-rating>
          <p id="tagline" v-if="!details.tagline"></p>
          <p id="tagline" v-else-if="details.tagline">
            "{{ details.tagline }}"
          </p>
          <v-card-title id="title">
            {{ this.items.title ? this.items.title : this.items.name }}
          </v-card-title>
          <v-card-subtitle id="runtime">
            {{
              this.items.release_date
                ? this.items.release_date
                : this.items.first_air_date | formatYear
            }}
            {{ details.runtime | formatRuntime }}
          </v-card-subtitle>
          <v-card-text id="overview">{{ this.items.overview }}</v-card-text>
        </v-col>

        <v-col>
          <v-card-text>
            Genres:
            <v-chip
              id="genre__chip"
              small
              class="ma-1"
              label
              v-for="(genre, g) in details.genres"
              :key="g"
              color="purple darken-2"
            >
              {{ genre.name }}
            </v-chip>
          </v-card-text>
          <v-card-text v-if="this.items.media_type">
            Cast:
            <v-chip
              id="genre__chip"
              small
              class="ma-1"
              label
              v-for="(cast, c) in castsToDisplay"
              :key="c"
              color="indigo darken-3"
            >
              {{ cast.name }}
            </v-chip>
          </v-card-text>
        </v-col>
      </v-row>
      <Similar :title="this.items.title" :items="similars" />
    </v-card>
  </v-dialog>
</template>

<script>
import Similar from '../../components/dialog/Similar'
export default {
  components: { Similar },
  component: {
    Similar,
  },
  data() {
    return {
      imgURL3: 'https://image.tmdb.org/t/p/w780',
      imgURL2: 'https://image.tmdb.org/t/p/w342',
      genres: null,
      loading: false,
      all_genres: null,
      details: [],
      credits: [],
      similars: [],
    }
  },
  props: {
    visible: {
      type: Boolean,
    },
    items: {
      type: Object,
      required: false,
    },
    mediatype: {
      type: String,
      required: false,
    },
  },
  async fetch() {
    this.details = await fetch(
      `https://api.themoviedb.org/3/${this.items.media_type}/${this.items.id}?api_key=fd88cff7f01965be8612902e680dd82c&language=en-US`
    ).then((res) => res.json())

    this.credits = await fetch(
      `https://api.themoviedb.org/3/${this.items.media_type}/${this.items.id}/credits?api_key=fd88cff7f01965be8612902e680dd82c&language=en-US`
    ).then((res) => res.json())

    this.similars = await fetch(
      `https://api.themoviedb.org/3/${this.items.media_type}/${this.items.id}/similar?api_key=fd88cff7f01965be8612902e680dd82c&language=en-US&page=1`
    ).then((res) => res.json())
  },
  computed: {
    castsToDisplay() {
      for (let i in this.credits.cast) {
        return this.credits.cast.slice(0, 4)
      }
    },
    show: {
      get() {
        return this.visible
      },
      set(value) {
        if (!value) {
          this.$emit('close')
        }
      },
    },
  },
}
</script>

<style>
#title {
  position: relative;
  left: 15px;
  bottom: 10px;
  font-size: 22px;
}

#dialog {
  position: relative;
  background-color: rgb(230, 230, 230);
  overflow-x: hidden;
}

#close {
  color: white;
  background-color: rgb(69, 39, 160) !important;
}

#backdrop {
  position: relative;
}

#poster {
  position: absolute;
  z-index: 9;
  top: 46px;
  /*left:25px; */
}

#rating {
  position: relative;
  top: 10px;
  left: 20px;
}

#runtime {
  position: relative;
  font-size: 15px;
  font-weight: 450;
  left: 15px;
  color: black;
}

#genre__chip {
  color: white;
}

#overview {
  position: relative;
  left: 15px;
}

#tagline {
  position: relative;
  top: 15px;
  left: 20px;
  font-variant: initial;
  font-style: italic;
  font-size: 20px;
}
</style>