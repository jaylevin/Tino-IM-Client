<template>
		<div class="columns is-multiline">
			<div @mousedown="start"
					 @mouseleave="stop"
					 @mouseup="stop"
					 @touchstart="start"
					 @touchend="stop"
					 @touchcancel="stop"
					 class="column msg" :class="{'incoming': !isIncoming}">
				<figure class="image is-64x64"
								:class="{'profile-left': !isIncoming,
												'profile-right': isIncoming}">
				    <img class="is-rounded" :src="avatarURI" v-model="avatarURI">
				</figure>
					<div class="message-head">
						<div class="delete-msg" v-if="isDeleting">
							<a :class="{'is-outlined': !msg.markedToDel}" @click="msg.markToDel()" class="button is-danger">
								<!-- <span>Delete</span> -->
								<span class="icon is-small">
									<i class="fas fa-times"></i>
								</span>
							</a>
						</div>
				    {{ fromFN }}
						<small class="timestamp">  {{ ts }} </small>
				  </div>
				  <div class="content">
				    {{ content }}
				  </div>
			</div>
		</div>
</template>


<script>
import store from "@/store/store.js";
export default {
  props: ["from", "ts", "content", "seq"],
  data() {
    return {
      interval: false,
      count: 0
    };
  },
  methods: {
    start() {
      if (!this.interval) {
        this.interval = setInterval(() => {
          if (this.count != 25) {
            this.count++;
          } else {
            this.stop();
          }
        }, 30);
      }
    },
    stop() {
      clearInterval(this.interval);
      this.interval = false;
      this.count = 0;
    }
  },
  computed: {}
};
</script>

<style lang="scss">
.msg {
  radius: 50px;
  padding: 0px;
  margin-bottom: 15px;
  text-align: left;
  radius: 5px;

  .content {
    color: white;
    margin-left: 65px;
    padding-top: 8px;
    padding-bottom: 8px;
    padding-left: 8px;
    background-color: rgba(0, 0, 0, 0.3);
  }
  .profile-left {
    float: left;
  }
  .profile-right {
    margin-left: 10px;
    float: right;
    margin-right: 10px;
  }
  .message-head {
    margin-left: 65px;
    background-color: rgba(0, 0, 0, 0.5);
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
.delete-msg {
  float: left;
  display: inline-block;
  margin-right: 5px;
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
