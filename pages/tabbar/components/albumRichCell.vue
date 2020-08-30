<template>
	<view bubble="true" class="rich-box" @tap.stop="toHideMore">
		<view class="rich-box-thumb-box"><image style="height: 520rpx; border-radius: 20rpx" :src="item.thumbNail" mode=""></image></view>
		<text class="rich-box-title">{{ item.workName }}</text>
		<view class="user-tag myp-flex-row myp-justify-between myp-align-center">
			<view class="myp-flex-row myp-align-center">
				<image class="avatar" :src="item.author.portraitUrl" mode=""></image>

				<text class="name">{{ item.author.userName }}</text>
				<view class="myp-flex-row"><image class="certs-icon" v-for="(icon, i) in item.author.userCertIcon" :key="i" :src="icon" mode=""></image></view>
			</view>
			<text class="workAttributeCode myp-radius-l myp-border-all">{{ item.workAttributeCode }}</text>
		</view>
		<view class="actions-publishTime myp-flex-row myp-justify-between">
			<view class="actions myp-flex-row">
				<view class="action-item myp-flex-row">
					<myp-icon name="eye" type="forth" size="" boxStyle="padding-right:4rpx" @iconClicked="toSet"></myp-icon>
					<text class="action-text">{{ item.readNum }}</text>
				</view>
				<view class="action-item myp-flex-row">
					<myp-icon name="love" type="forth" size="" boxStyle="padding-right:4rpx" @iconClicked="toSet"></myp-icon>
					<text class="action-text">{{ item.likeNum }}</text>
				</view>
				<view class="action-item myp-flex-row">
					<myp-icon name="comment-dots" type="forth" size="" boxStyle="padding-right:4rpx" @iconClicked="toSet"></myp-icon>
					<text class="action-text">{{ item.keepNum }}</text>
				</view>
			</view>
			<text class="publishTime">{{ item.publishTime }}</text>
		</view>
	</view>
</template>

<script>
import commentTextCell from './commentTextCell.vue';

import filterMixin from '@/mypUI/myp-mixin/filterMixin.js';

export default {
	components: {
		commentTextCell
	},
	mixins: [filterMixin],
	props: {
		item: {
			type: Object,
			default: () => {
				return {};
			}
		},
		hasMore: {
			type: Boolean,
			default: false
		},
		showCircle: {
			type: Boolean,
			default: true
		},
		opened: {
			type: [Number, String],
			default: 0
		}
	},

	computed: {},

	methods: {
		toHideMore(e) {
			e && e.stopPropagation && e.stopPropagation();
			this.$emit('more', { id: 0 });
		},

		// numToText(val, token) {
		// 	if (val <= 0) return token;
		// 	if (val >= 1000 && val < 10000) {
		// 		return (val / 1000).toFixed(1) + 'K';
		// 	} else if (val >= 10000) {
		// 		return (val / 10000).toFixed(1) + 'ä¸;
		// 	}
		// 	return val;
		// },
		toImagesPreview(val) {
			this.$emit('more', { id: 0 });
			const imgs = [];
			this.images.forEach(i => {
				imgs.push(i.url);
			});
			uni.previewImage({
				current: val,
				urls: imgs
			});
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/mypUI/mypui.scss';
.rich-box {
	margin-left: 50rpx;
	border-radius: 20rpx;
	background-color: #fff;
	margin-right: 50rpx;
	border-style: solid;
	// margin-bottom: 50rpx;
	margin-top: 25rpx;
	margin-bottom: 25rpx;
	&-thumb-box {
		height: 520rpx;
	}
	&-title {
		font-weight: bold;
		margin-left: 30rpx;
		font-size: 38rpx;
		margin-top: 30rpx;
		margin-bottom: 30rpx;
	}
}
.user-tag {
	margin-left: 20rpx;
	margin-right: 20rpx;
}
.avatar {
	width: 50rpx;
	height: 50rpx;
	border-radius: 50rpx;
	border-top-right-radius: 50rpx;
	border-bottom-left-radius: 50rpx;
	border-bottom-right-radius: 50rpx;
	border-top-left-radius: 50rpx;
	margin-right: 20rpx;
}
.name {
	font-size: 30rpx;
	color: #191919;
}

.certs-icon {
	margin-left: 10rpx;
	height: 35rpx;
	width: 35rpx;
}

.workAttributeCode {
	font-size: 26rpx;
	color: $myp-text-color-forth;
	padding-top: 6rpx;
	padding-bottom: 6rpx;
	padding-left: 16rpx;
	padding-right: 16rpx;
}

.actions-publishTime {
	margin-left: 20rpx;
	margin-right: 20rpx;
	margin-top: 30rpx;
	margin-bottom: 30rpx;
}
.action-item {
	margin-right: 40rpx;
}

.publishTime {
	color: #c2c1c6;
	font-size: 30rpx;
}

.action-text {
	color: $myp-text-color-forth;
	font-size: 30rpx;
}
</style>
