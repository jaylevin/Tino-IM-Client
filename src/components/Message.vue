<template>
		<div class="columns is-multiline">
			<div class="column msg" :class="{'incoming': from === 'Me'}">
				<figure class="image is-64x64" :class="{'profile-left': from === 'Me', 'profile-right': from !== 'Me' }" >
					<img class="is-rounded" :src="profileImageURI">
				</figure>
					<div class="message-head">
				    {{ from }}
						<small class="timestamp">  {{ ts }} </small>
				  </div>
				  <div class="content">
				    <slot></slot>
				  </div>
			</div>
		</div>
</template>


<script>
const defaultAvatar = `data:image/png;base64,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`;
import store from "@/store.js";
export default {
  props: ["from", "to", "ts"],
  data() {
    return {
      profileImageURI: defaultAvatar
    };
  },
  mounted() {},
  computed: {
    // Styles incoming messages differently. See the above :class binding.
    isIncoming() {
      return this.from == "Me";
    }
  }
};
</script>

<style lang="scss">
$grey-darker:  hsl(0, 0%, 21%) !default
$grey-dark:    hsl(0, 0%, 29%) !default
$accent: #00a1ff;


.msg {
	radius:50px;
  padding: 0px;
  margin-bottom: 15px;
  text-align: left;
	radius: 5px;

	.content {
		color: white;
		margin-left:65px;
		padding-top:8px;
		padding-bottom:8px;
		padding-left:8px;
		background-color: rgba(0,0,0,0.3)
	}
	.profile-left {
	  float: left;
	}
	.profile-right {
	  margin-left: 10px;
	  float: right;
		margin-right:10px;
	}
	.message-head {
		margin-left:65px;
		background-color: rgba(0,0,0,0.5);
		padding: 8px;
		color: red;
		.timestamp {
			float: right;
		}
	}
}

.incoming {
	.content {
		color: $accent;
	}
	.message-head {
		color: white;
	}
}

.image {
  position: fixed;
  margin-top: 5px;
  margin-bottom: 15px;
  margin-right: 5px;
}
.columns {
  margin-left: 5px;
  margin-right: 5px;
}

</style>
