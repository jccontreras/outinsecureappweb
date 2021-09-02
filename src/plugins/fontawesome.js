import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome,
    faArrowCircleLeft,
    faInfoCircle,
    faEnvelope,
    faPhoneSquare,
    faMapMarkerAlt,
    faAddressCard,
    faUser,
    faLock,
    faUnlock,
    faEllipsisH,
    faListAlt,
    faKey,
    faEye,
    faEyeSlash,
    faUserPlus} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faHome, faArrowCircleLeft, faInfoCircle, faEnvelope, faPhoneSquare, faMapMarkerAlt, faAddressCard,
            faUser, faLock, faUnlock, faEllipsisH, faListAlt, faKey, faEye, faEyeSlash, faUserPlus);

Vue.component('font-awesome-icon', FontAwesomeIcon);