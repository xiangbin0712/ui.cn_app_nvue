<template>
  <view>
    <!-- #ifdef APP-NVUE -->
    <myp-list
      ref="myp-list"
      bgType="dark"
      tabHeight="50"
      show-scrollbar="false"
      :useLoading="true"
      :autoUpdate="true"
      @down="downtoLoad"
      @up="uptoLoad"
    >
      <myp-list-cell v-for="(item, idx) in items" :key="idx">
        <album-rich-cell
          :item="item"
          @user="toUser"
          @detail="toDetail"
          @thumb="toThumb"
          @comment="toComment"
          @moreComment="toMoreComment"
          @share="toShare"
        ></album-rich-cell>
      </myp-list-cell>
    </myp-list>
    <!-- #endif -->
  </view>
</template>

<script>
import albumRichCell from './albumRichCell.vue';

import contentBoxMixin from '@/mypUI/myp-mixin/contentBoxMixin.js';
// import childMixin from '@/mypUI/myp-list/header/headerChild.js';

// import { thumbAlbum, cancelThumbAlbum, getAlbumList } from '@/api/album.js';
import { homePageFeatured } from '@/api/project.js';

export default {
  components: {
    albumRichCell,
  },
  mixins: [contentBoxMixin],
  data() {
    return {
      mypIncludeStatus: false,
      mypIncludeNav: false,
      mypIncludeXBar: false,
      mypExtra: 180,
      items: [],
      page: 0,
    };
  },
  methods: {
    toRefresh(ref, sucH, failH) {
      console.log('init');
      // this.toGetAlbums('refresh', ref, sucH, failH);
    },
    toDetail(val) {
      this.$emit('detail', val);
    },
    toUser(val) {
      this.$emit('user', val);
    },
    toThumb(val) {},
    toComment(val) {
      this.$emit('comment', val);
    },
    toShare(val) {
      this.$emit('share', val);
    },
    toMoreComment(val) {
      this.$emit('moreComment', val);
    },
    downtoLoad() {
      console.log('down');
      this.page = 0;
      this.getData();
    },
    uptoLoad() {
      console.log('up');
      this.getData();
    },
    getData() {
      const ins = this.$refs['myp-list'];
      const cp = ins.mypCurrentPage;
      homePageFeatured({ tag: 'NEWS', page: this.page })
        .then((response) => {
          this.page++;
          if (cp === 1) {
            this.items = response.content || [];
          } else {
            this.items = this.items.concat(response.content || []);
          }
          // true or false means if having a next page
          ins.mypEndSuccess(true);
        })
        .catch((err) => {
          ins.mypEndError();
        });
    },
    toLoadData1() {
      const ins = this.$refs['myp-list'];
      const cp = ins.mypCurrentPage;
      console.log(cp, '++++++++++++++++cp');
      homePageFeatured({ tag: 'HOME', page: this.page })
        .then((response) => {
          this.page++;
          if (cp === 1) {
            this.items = response.content || [];
          } else {
            this.items = this.items.concat(response.content || []);
          }
          // true or false means if having a next page
          ins.mypEndSuccess(true);
        })
        .catch((err) => {
          ins.mypEndError();
        });
    },

    toGetAlbums1(val, ref, sucH, failH) {
      if (this.current !== this.index) return;
      this.mypInited = true;
      const cp = this.mypStart(val);
      if (!cp) return;
      const mode = this.index === 0 ? 'all' : 'hot';
      homePageFeatured({ tag: 'HOME', page: this.page })
        .then((response) => {
          this.page++;
          if (cp === 1) {
            this.items = response.content || [];
          } else {
            this.items = this.items.concat(response.content || []);
          }
          this.mypEndSuccess(cp, response.next, ref, sucH);
        })
        .catch((err) => {
          this.$emit('error', err);
          this.mypEndError(cp, ref, failH);
        });
    },
  },
};
</script>

<style></style>
