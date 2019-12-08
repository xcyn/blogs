import Vue from 'vue';
import homeSkeleton from './home';
import messageHistory from './message-history';
import testSkeletonSkeleton from './test-skeleton';

export default new Vue({
    components: {
        homeSkeleton,
        messageHistory,
        testSkeletonSkeleton
    },
    template: `
       <div style='height: 100%;'>
           <homeSkeleton id="homeSkeleton" style="display:none"/>
           <messageHistory id="messageHistory" style="display:none"/>
           <testSkeletonSkeleton id="testSkeletonSkeleton" style="display:none"/>
       </div>
    `
});
