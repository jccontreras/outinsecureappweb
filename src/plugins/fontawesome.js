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
    faUserPlus,
    faChartArea,
    faSignOutAlt,
    faClipboardList,
    faUsers,
    faUsersCog,
    faUserTie,
    faUserEdit,
    faUserMinus} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faHome, faArrowCircleLeft, faInfoCircle, faEnvelope, faPhoneSquare, faMapMarkerAlt, faAddressCard,
            faUser, faLock, faUnlock, faEllipsisH, faListAlt, faKey, faEye, faEyeSlash, faUserPlus, faChartArea,
            faSignOutAlt, faClipboardList, faUsers, faUsersCog, faUserTie, faUserEdit, faUserMinus);

Vue.component('font-awesome-icon', FontAwesomeIcon);