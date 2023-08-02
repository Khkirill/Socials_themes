import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, HostBinding, Inject, Input, Output, PLATFORM_ID, ViewChild, ViewEncapsulation, } from '@angular/core';
// @ts-ignore
import Swiper from 'swiper';
import { of, Subject } from 'rxjs';
import { getParams } from './utils/get-params';
import { SwiperSlideDirective } from './swiper-slide.directive';
import { extend, isObject, setProperty, ignoreNgOnChanges, coerceBooleanProperty, isShowEl, isEnabled, } from './utils/utils';
import { isPlatformBrowser } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class SwiperComponent {
    constructor(_ngZone, elementRef, _changeDetectorRef, _platformId) {
        this._ngZone = _ngZone;
        this.elementRef = elementRef;
        this._changeDetectorRef = _changeDetectorRef;
        this._platformId = _platformId;
        this.slideClass = 'swiper-slide';
        this.wrapperClass = 'swiper-wrapper';
        this.showNavigation = true;
        this.showPagination = true;
        this.showScrollbar = true;
        this.s__beforeBreakpoint = new EventEmitter();
        this.s__containerClasses = new EventEmitter();
        this.s__slideClass = new EventEmitter();
        this.s__swiper = new EventEmitter();
        this.s_activeIndexChange = new EventEmitter();
        this.s_afterInit = new EventEmitter();
        this.s_autoplay = new EventEmitter();
        this.s_autoplayStart = new EventEmitter();
        this.s_autoplayStop = new EventEmitter();
        this.s_autoplayPause = new EventEmitter();
        this.s_autoplayResume = new EventEmitter();
        this.s_beforeDestroy = new EventEmitter();
        this.s_beforeInit = new EventEmitter();
        this.s_beforeLoopFix = new EventEmitter();
        this.s_beforeResize = new EventEmitter();
        this.s_beforeSlideChangeStart = new EventEmitter();
        this.s_beforeTransitionStart = new EventEmitter();
        this.s_breakpoint = new EventEmitter();
        this.s_changeDirection = new EventEmitter();
        this.s_click = new EventEmitter();
        this.s_doubleTap = new EventEmitter();
        this.s_doubleClick = new EventEmitter();
        this.s_destroy = new EventEmitter();
        this.s_fromEdge = new EventEmitter();
        this.s_hashChange = new EventEmitter();
        this.s_hashSet = new EventEmitter();
        this.s_imagesReady = new EventEmitter();
        this.s_init = new EventEmitter();
        this.s_keyPress = new EventEmitter();
        this.s_lazyImageLoad = new EventEmitter();
        this.s_lazyImageReady = new EventEmitter();
        this.s_loopFix = new EventEmitter();
        this.s_momentumBounce = new EventEmitter();
        this.s_navigationHide = new EventEmitter();
        this.s_navigationShow = new EventEmitter();
        this.s_navigationPrev = new EventEmitter();
        this.s_navigationNext = new EventEmitter();
        this.s_observerUpdate = new EventEmitter();
        this.s_orientationchange = new EventEmitter();
        this.s_paginationHide = new EventEmitter();
        this.s_paginationRender = new EventEmitter();
        this.s_paginationShow = new EventEmitter();
        this.s_paginationUpdate = new EventEmitter();
        this.s_progress = new EventEmitter();
        this.s_reachBeginning = new EventEmitter();
        this.s_reachEnd = new EventEmitter();
        this.s_realIndexChange = new EventEmitter();
        this.s_resize = new EventEmitter();
        this.s_scroll = new EventEmitter();
        this.s_scrollbarDragEnd = new EventEmitter();
        this.s_scrollbarDragMove = new EventEmitter();
        this.s_scrollbarDragStart = new EventEmitter();
        this.s_setTransition = new EventEmitter();
        this.s_setTranslate = new EventEmitter();
        this.s_slideChange = new EventEmitter();
        this.s_slideChangeTransitionEnd = new EventEmitter();
        this.s_slideChangeTransitionStart = new EventEmitter();
        this.s_slideNextTransitionEnd = new EventEmitter();
        this.s_slideNextTransitionStart = new EventEmitter();
        this.s_slidePrevTransitionEnd = new EventEmitter();
        this.s_slidePrevTransitionStart = new EventEmitter();
        this.s_slideResetTransitionStart = new EventEmitter();
        this.s_slideResetTransitionEnd = new EventEmitter();
        this.s_sliderMove = new EventEmitter();
        this.s_sliderFirstMove = new EventEmitter();
        this.s_slidesLengthChange = new EventEmitter();
        this.s_slidesGridLengthChange = new EventEmitter();
        this.s_snapGridLengthChange = new EventEmitter();
        this.s_snapIndexChange = new EventEmitter();
        this.s_tap = new EventEmitter();
        this.s_toEdge = new EventEmitter();
        this.s_touchEnd = new EventEmitter();
        this.s_touchMove = new EventEmitter();
        this.s_touchMoveOpposite = new EventEmitter();
        this.s_touchStart = new EventEmitter();
        this.s_transitionEnd = new EventEmitter();
        this.s_transitionStart = new EventEmitter();
        this.s_update = new EventEmitter();
        this.s_zoomChange = new EventEmitter();
        this.s_swiper = new EventEmitter();
        this.s_lock = new EventEmitter();
        this.s_unlock = new EventEmitter();
        this._activeSlides = new Subject();
        this.containerClasses = 'swiper';
        this.slidesChanges = (val) => {
            this.slides = val.map((slide, index) => {
                slide.slideIndex = index;
                slide.classNames = this.slideClass || '';
                return slide;
            });
            if (this.loop && !this.loopedSlides) {
                this.calcLoopedSlides();
            }
            if (!this.virtual) {
                if (this.loopedSlides) {
                    this.prependSlides = of(this.slides.slice(this.slides.length - this.loopedSlides));
                    this.appendSlides = of(this.slides.slice(0, this.loopedSlides));
                }
            }
            else if (this.swiperRef && this.swiperRef.virtual) {
                this._ngZone.runOutsideAngular(() => {
                    this.swiperRef.virtual.slides = this.slides;
                    this.swiperRef.virtual.update(true);
                });
            }
            this._changeDetectorRef.detectChanges();
        };
        this.style = null;
        this.updateVirtualSlides = (virtualData) => {
            // TODO: type virtualData
            if (!this.swiperRef ||
                (this.currentVirtualData &&
                    this.currentVirtualData.from === virtualData.from &&
                    this.currentVirtualData.to === virtualData.to &&
                    this.currentVirtualData.offset === virtualData.offset)) {
                return;
            }
            this.style = this.swiperRef.isHorizontal()
                ? {
                    [this.swiperRef.rtlTranslate ? 'right' : 'left']: `${virtualData.offset}px`,
                }
                : {
                    top: `${virtualData.offset}px`,
                };
            this.currentVirtualData = virtualData;
            this._activeSlides.next(virtualData.slides);
            this._ngZone.run(() => {
                this._changeDetectorRef.detectChanges();
            });
            this._ngZone.runOutsideAngular(() => {
                this.swiperRef.updateSlides();
                this.swiperRef.updateProgress();
                this.swiperRef.updateSlidesClasses();
                if (isEnabled(this.swiperRef.params.lazy)) {
                    this.swiperRef.lazy.load();
                }
                this.swiperRef.virtual.update(true);
            });
            return;
        };
    }
    set navigation(val) {
        const currentNext = typeof this._navigation !== 'boolean' && this._navigation !== ''
            ? this._navigation?.nextEl
            : null;
        const currentPrev = typeof this._navigation !== 'boolean' && this._navigation !== ''
            ? this._navigation?.prevEl
            : null;
        this._navigation = setProperty(val, {
            nextEl: currentNext || null,
            prevEl: currentPrev || null,
        });
        this.showNavigation = !(coerceBooleanProperty(val) !== true ||
            (this._navigation &&
                typeof this._navigation !== 'boolean' &&
                this._navigation.prevEl !== this._prevElRef?.nativeElement &&
                (this._navigation.prevEl !== null || this._navigation.nextEl !== null) &&
                (typeof this._navigation.nextEl === 'string' ||
                    typeof this._navigation.prevEl === 'string' ||
                    typeof this._navigation.nextEl === 'object' ||
                    typeof this._navigation.prevEl === 'object')));
    }
    get navigation() {
        return this._navigation;
    }
    set pagination(val) {
        const current = typeof this._pagination !== 'boolean' && this._pagination !== ''
            ? this._pagination?.el
            : null;
        this._pagination = setProperty(val, {
            el: current || null,
        });
        this.showPagination = isShowEl(val, this._pagination, this._paginationElRef);
    }
    get pagination() {
        return this._pagination;
    }
    set scrollbar(val) {
        const current = typeof this._scrollbar !== 'boolean' && this._scrollbar !== '' ? this._scrollbar?.el : null;
        this._scrollbar = setProperty(val, {
            el: current || null,
        });
        this.showScrollbar = isShowEl(val, this._scrollbar, this._scrollbarElRef);
    }
    get scrollbar() {
        return this._scrollbar;
    }
    set virtual(val) {
        this._virtual = setProperty(val);
    }
    get virtual() {
        return this._virtual;
    }
    set config(val) {
        this.updateSwiper(val);
        const { params } = getParams(val);
        Object.assign(this, params);
    }
    set prevElRef(el) {
        this._prevElRef = el;
        this._setElement(el, this.navigation, 'navigation', 'prevEl');
    }
    set nextElRef(el) {
        this._nextElRef = el;
        this._setElement(el, this.navigation, 'navigation', 'nextEl');
    }
    set scrollbarElRef(el) {
        this._scrollbarElRef = el;
        this._setElement(el, this.scrollbar, 'scrollbar');
    }
    set paginationElRef(el) {
        this._paginationElRef = el;
        this._setElement(el, this.pagination, 'pagination');
    }
    get activeSlides() {
        if (this.virtual) {
            return this._activeSlides;
        }
        return of(this.slides);
    }
    get zoomContainerClass() {
        return this.zoom && typeof this.zoom !== 'boolean'
            ? this.zoom.containerClass
            : 'swiper-zoom-container';
    }
    _setElement(el, ref, update, key = 'el') {
        if (!ref || !el)
            return;
        if (el.nativeElement) {
            if (ref[key] === el.nativeElement) {
                return;
            }
            ref[key] = el.nativeElement;
        }
        const updateObj = {};
        updateObj[update] = true;
        this.updateInitSwiper(updateObj);
    }
    ngOnInit() {
        const { params } = getParams(this);
        Object.assign(this, params);
    }
    ngAfterViewInit() {
        this.childrenSlidesInit();
        this.initSwiper();
        this._changeDetectorRef.detectChanges();
        setTimeout(() => {
            this.s_swiper.emit(this.swiperRef);
        });
    }
    childrenSlidesInit() {
        this.slidesChanges(this.slidesEl);
        this.slidesEl.changes.subscribe(this.slidesChanges);
    }
    get isSwiperActive() {
        return this.swiperRef && !this.swiperRef.destroyed;
    }
    initSwiper() {
        const { params: swiperParams, passedParams } = getParams(this);
        Object.assign(this, swiperParams);
        this._ngZone.runOutsideAngular(() => {
            swiperParams.init = false;
            if (!swiperParams.virtual) {
                swiperParams.observer = true;
            }
            swiperParams.onAny = (eventName, ...args) => {
                const emitter = this[('s_' + eventName)];
                if (emitter) {
                    emitter.emit([...args]);
                }
            };
            const _slideClasses = (_, updated) => {
                updated.forEach(({ slideEl, classNames }, index) => {
                    const dataIndex = slideEl.getAttribute('data-swiper-slide-index');
                    const slideIndex = dataIndex ? parseInt(dataIndex) : index;
                    if (this.virtual) {
                        const virtualSlide = this.slides.find((item) => {
                            return item.virtualIndex && item.virtualIndex === slideIndex;
                        });
                        if (virtualSlide) {
                            virtualSlide.classNames = classNames;
                            return;
                        }
                    }
                    if (this.slides[slideIndex]) {
                        this.slides[slideIndex].classNames = classNames;
                    }
                });
                this._changeDetectorRef.detectChanges();
            };
            const _containerClasses = (_, classes) => {
                setTimeout(() => {
                    this.containerClasses = classes;
                });
            };
            Object.assign(swiperParams.on, {
                _containerClasses,
                _slideClasses,
            });
            const swiperRef = new Swiper(swiperParams);
            swiperRef.loopCreate = () => { };
            swiperRef.loopDestroy = () => { };
            if (swiperParams.loop) {
                swiperRef.loopedSlides = this.loopedSlides;
            }
            const isVirtualEnabled = isEnabled(swiperRef.params.virtual);
            if (swiperRef.virtual && isVirtualEnabled) {
                swiperRef.virtual.slides = this.slides;
                const extendWith = {
                    cache: false,
                    slides: this.slides,
                    renderExternal: this.updateVirtualSlides,
                    renderExternalUpdate: false,
                };
                extend(swiperRef.params.virtual, extendWith);
                extend(swiperRef.originalParams.virtual, extendWith);
            }
            if (isPlatformBrowser(this._platformId)) {
                this.swiperRef = swiperRef.init(this.elementRef.nativeElement);
                const isVirtualEnabled = isEnabled(this.swiperRef.params.virtual);
                if (this.swiperRef.virtual && isVirtualEnabled) {
                    this.swiperRef.virtual.update(true);
                }
                this._changeDetectorRef.detectChanges();
            }
        });
    }
    ngOnChanges(changedParams) {
        this.updateSwiper(changedParams);
        this._changeDetectorRef.detectChanges();
    }
    updateInitSwiper(changedParams) {
        if (!(changedParams && this.swiperRef && !this.swiperRef.destroyed)) {
            return;
        }
        this._ngZone.runOutsideAngular(() => {
            const { params: currentParams, pagination, navigation, scrollbar, virtual, thumbs, } = this.swiperRef;
            if (changedParams.pagination) {
                if (this.pagination &&
                    typeof this.pagination !== 'boolean' &&
                    this.pagination.el &&
                    pagination &&
                    !pagination.el) {
                    this.updateParameter('pagination', this.pagination);
                    pagination.init();
                    pagination.render();
                    pagination.update();
                }
                else {
                    pagination.destroy();
                    pagination.el = null;
                }
            }
            if (changedParams.scrollbar) {
                if (this.scrollbar &&
                    typeof this.scrollbar !== 'boolean' &&
                    this.scrollbar.el &&
                    scrollbar &&
                    !scrollbar.el) {
                    this.updateParameter('scrollbar', this.scrollbar);
                    scrollbar.init();
                    scrollbar.updateSize();
                    scrollbar.setTranslate();
                }
                else {
                    scrollbar.destroy();
                    scrollbar.el = null;
                }
            }
            if (changedParams.navigation) {
                if (this.navigation &&
                    typeof this.navigation !== 'boolean' &&
                    this.navigation.prevEl &&
                    this.navigation.nextEl &&
                    navigation &&
                    !navigation.prevEl &&
                    !navigation.nextEl) {
                    this.updateParameter('navigation', this.navigation);
                    navigation.init();
                    navigation.update();
                }
                else if (navigation.prevEl && navigation.nextEl) {
                    navigation.destroy();
                    navigation.nextEl = null;
                    navigation.prevEl = null;
                }
            }
            if (changedParams.thumbs && this.thumbs && this.thumbs.swiper) {
                this.updateParameter('thumbs', this.thumbs);
                const initialized = thumbs.init();
                if (initialized)
                    thumbs.update(true);
            }
            if (changedParams.controller && this.controller && this.controller.control) {
                this.swiperRef.controller.control = this.controller.control;
            }
            this.swiperRef.update();
        });
    }
    updateSwiper(changedParams) {
        this._ngZone.runOutsideAngular(() => {
            if (changedParams.config) {
                return;
            }
            if (!(changedParams && this.swiperRef && !this.swiperRef.destroyed)) {
                return;
            }
            for (const key in changedParams) {
                if (ignoreNgOnChanges.indexOf(key) >= 0) {
                    continue;
                }
                const newValue = changedParams[key]?.currentValue ?? changedParams[key];
                this.updateParameter(key, newValue);
            }
            if (changedParams.allowSlideNext) {
                this.swiperRef.allowSlideNext = this.allowSlideNext;
            }
            if (changedParams.allowSlidePrev) {
                this.swiperRef.allowSlidePrev = this.allowSlidePrev;
            }
            if (changedParams.direction) {
                this.swiperRef.changeDirection(this.direction, false);
            }
            if (changedParams.breakpoints) {
                if (this.loop && !this.loopedSlides) {
                    this.calcLoopedSlides();
                }
                this.swiperRef.currentBreakpoint = null;
                this.swiperRef.setBreakpoint();
            }
            if (changedParams.thumbs || changedParams.controller) {
                this.updateInitSwiper(changedParams);
            }
            this.swiperRef.update();
        });
    }
    calcLoopedSlides() {
        if (!this.loop) {
            return false;
        }
        let slidesPerViewParams = this.slidesPerView;
        if (this.breakpoints) {
            const breakpoint = Swiper.prototype.getBreakpoint(this.breakpoints);
            const breakpointOnlyParams = breakpoint in this.breakpoints ? this.breakpoints[breakpoint] : undefined;
            if (breakpointOnlyParams && breakpointOnlyParams.slidesPerView) {
                slidesPerViewParams = breakpointOnlyParams.slidesPerView;
            }
        }
        if (slidesPerViewParams === 'auto') {
            this.loopedSlides = this.slides.length;
            return this.slides.length;
        }
        let loopedSlides = this.loopedSlides || slidesPerViewParams;
        if (!loopedSlides) {
            // ?
            return false;
        }
        if (this.loopAdditionalSlides) {
            loopedSlides += this.loopAdditionalSlides;
        }
        if (loopedSlides > this.slides.length) {
            loopedSlides = this.slides.length;
        }
        this.loopedSlides = loopedSlides;
        return true;
    }
    updateParameter(key, value) {
        if (!(this.swiperRef && !this.swiperRef.destroyed)) {
            return;
        }
        const _key = key.replace(/^_/, '');
        const isCurrentParamObj = isObject(this.swiperRef.params[_key]);
        if (_key === 'enabled') {
            if (value === true) {
                this.swiperRef.enable();
            }
            else if (value === false) {
                this.swiperRef.disable();
            }
            return;
        }
        if (isCurrentParamObj && isObject(value)) {
            extend(this.swiperRef.params[_key], value);
        }
        else {
            this.swiperRef.params[_key] = value;
        }
    }
    ngOnDestroy() {
        this._ngZone.runOutsideAngular(() => {
            this.swiperRef?.destroy(true, false);
        });
    }
}
SwiperComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: SwiperComponent, deps: [{ token: i0.NgZone }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Component });
SwiperComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: SwiperComponent, selector: "swiper, [swiper]", inputs: { enabled: "enabled", on: "on", direction: "direction", touchEventsTarget: "touchEventsTarget", initialSlide: "initialSlide", speed: "speed", cssMode: "cssMode", updateOnWindowResize: "updateOnWindowResize", resizeObserver: "resizeObserver", nested: "nested", focusableElements: "focusableElements", width: "width", height: "height", preventInteractionOnTransition: "preventInteractionOnTransition", userAgent: "userAgent", url: "url", edgeSwipeDetection: "edgeSwipeDetection", edgeSwipeThreshold: "edgeSwipeThreshold", freeMode: "freeMode", autoHeight: "autoHeight", setWrapperSize: "setWrapperSize", virtualTranslate: "virtualTranslate", effect: "effect", breakpoints: "breakpoints", spaceBetween: "spaceBetween", slidesPerView: "slidesPerView", maxBackfaceHiddenSlides: "maxBackfaceHiddenSlides", grid: "grid", slidesPerGroup: "slidesPerGroup", slidesPerGroupSkip: "slidesPerGroupSkip", centeredSlides: "centeredSlides", centeredSlidesBounds: "centeredSlidesBounds", slidesOffsetBefore: "slidesOffsetBefore", slidesOffsetAfter: "slidesOffsetAfter", normalizeSlideIndex: "normalizeSlideIndex", centerInsufficientSlides: "centerInsufficientSlides", watchOverflow: "watchOverflow", roundLengths: "roundLengths", touchRatio: "touchRatio", touchAngle: "touchAngle", simulateTouch: "simulateTouch", shortSwipes: "shortSwipes", longSwipes: "longSwipes", longSwipesRatio: "longSwipesRatio", longSwipesMs: "longSwipesMs", followFinger: "followFinger", allowTouchMove: "allowTouchMove", threshold: "threshold", touchMoveStopPropagation: "touchMoveStopPropagation", touchStartPreventDefault: "touchStartPreventDefault", touchStartForcePreventDefault: "touchStartForcePreventDefault", touchReleaseOnEdges: "touchReleaseOnEdges", uniqueNavElements: "uniqueNavElements", resistance: "resistance", resistanceRatio: "resistanceRatio", watchSlidesProgress: "watchSlidesProgress", grabCursor: "grabCursor", preventClicks: "preventClicks", preventClicksPropagation: "preventClicksPropagation", slideToClickedSlide: "slideToClickedSlide", preloadImages: "preloadImages", updateOnImagesReady: "updateOnImagesReady", loop: "loop", loopAdditionalSlides: "loopAdditionalSlides", loopedSlides: "loopedSlides", loopedSlidesLimit: "loopedSlidesLimit", loopFillGroupWithBlank: "loopFillGroupWithBlank", loopPreventsSlide: "loopPreventsSlide", rewind: "rewind", allowSlidePrev: "allowSlidePrev", allowSlideNext: "allowSlideNext", swipeHandler: "swipeHandler", noSwiping: "noSwiping", noSwipingClass: "noSwipingClass", noSwipingSelector: "noSwipingSelector", passiveListeners: "passiveListeners", containerModifierClass: "containerModifierClass", slideClass: "slideClass", slideBlankClass: "slideBlankClass", slideActiveClass: "slideActiveClass", slideDuplicateActiveClass: "slideDuplicateActiveClass", slideVisibleClass: "slideVisibleClass", slideDuplicateClass: "slideDuplicateClass", slideNextClass: "slideNextClass", slideDuplicateNextClass: "slideDuplicateNextClass", slidePrevClass: "slidePrevClass", slideDuplicatePrevClass: "slideDuplicatePrevClass", wrapperClass: "wrapperClass", runCallbacksOnInit: "runCallbacksOnInit", observeParents: "observeParents", observeSlideChildren: "observeSlideChildren", a11y: "a11y", autoplay: "autoplay", controller: "controller", coverflowEffect: "coverflowEffect", cubeEffect: "cubeEffect", fadeEffect: "fadeEffect", flipEffect: "flipEffect", creativeEffect: "creativeEffect", cardsEffect: "cardsEffect", hashNavigation: "hashNavigation", history: "history", keyboard: "keyboard", lazy: "lazy", mousewheel: "mousewheel", parallax: "parallax", thumbs: "thumbs", zoom: "zoom", slidesPerGroupAuto: "slidesPerGroupAuto", class: "class", id: "id", navigation: "navigation", pagination: "pagination", scrollbar: "scrollbar", virtual: "virtual", config: "config" }, outputs: { s__beforeBreakpoint: "_beforeBreakpoint", s__containerClasses: "_containerClasses", s__slideClass: "_slideClass", s__swiper: "_swiper", s_activeIndexChange: "activeIndexChange", s_afterInit: "afterInit", s_autoplay: "autoplay", s_autoplayStart: "autoplayStart", s_autoplayStop: "autoplayStop", s_autoplayPause: "autoplayPause", s_autoplayResume: "autoplayResume", s_beforeDestroy: "beforeDestroy", s_beforeInit: "beforeInit", s_beforeLoopFix: "beforeLoopFix", s_beforeResize: "beforeResize", s_beforeSlideChangeStart: "beforeSlideChangeStart", s_beforeTransitionStart: "beforeTransitionStart", s_breakpoint: "breakpoint", s_changeDirection: "changeDirection", s_click: "click", s_doubleTap: "doubleTap", s_doubleClick: "doubleClick", s_destroy: "destroy", s_fromEdge: "fromEdge", s_hashChange: "hashChange", s_hashSet: "hashSet", s_imagesReady: "imagesReady", s_init: "init", s_keyPress: "keyPress", s_lazyImageLoad: "lazyImageLoad", s_lazyImageReady: "lazyImageReady", s_loopFix: "loopFix", s_momentumBounce: "momentumBounce", s_navigationHide: "navigationHide", s_navigationShow: "navigationShow", s_navigationPrev: "navigationPrev", s_navigationNext: "navigationNext", s_observerUpdate: "observerUpdate", s_orientationchange: "orientationchange", s_paginationHide: "paginationHide", s_paginationRender: "paginationRender", s_paginationShow: "paginationShow", s_paginationUpdate: "paginationUpdate", s_progress: "progress", s_reachBeginning: "reachBeginning", s_reachEnd: "reachEnd", s_realIndexChange: "realIndexChange", s_resize: "resize", s_scroll: "scroll", s_scrollbarDragEnd: "scrollbarDragEnd", s_scrollbarDragMove: "scrollbarDragMove", s_scrollbarDragStart: "scrollbarDragStart", s_setTransition: "setTransition", s_setTranslate: "setTranslate", s_slideChange: "slideChange", s_slideChangeTransitionEnd: "slideChangeTransitionEnd", s_slideChangeTransitionStart: "slideChangeTransitionStart", s_slideNextTransitionEnd: "slideNextTransitionEnd", s_slideNextTransitionStart: "slideNextTransitionStart", s_slidePrevTransitionEnd: "slidePrevTransitionEnd", s_slidePrevTransitionStart: "slidePrevTransitionStart", s_slideResetTransitionStart: "slideResetTransitionStart", s_slideResetTransitionEnd: "slideResetTransitionEnd", s_sliderMove: "sliderMove", s_sliderFirstMove: "sliderFirstMove", s_slidesLengthChange: "slidesLengthChange", s_slidesGridLengthChange: "slidesGridLengthChange", s_snapGridLengthChange: "snapGridLengthChange", s_snapIndexChange: "snapIndexChange", s_tap: "tap", s_toEdge: "toEdge", s_touchEnd: "touchEnd", s_touchMove: "touchMove", s_touchMoveOpposite: "touchMoveOpposite", s_touchStart: "touchStart", s_transitionEnd: "transitionEnd", s_transitionStart: "transitionStart", s_update: "update", s_zoomChange: "zoomChange", s_swiper: "swiper", s_lock: "lock", s_unlock: "unlock" }, host: { properties: { "class": "this.containerClasses" } }, queries: [{ propertyName: "slidesEl", predicate: SwiperSlideDirective }], viewQueries: [{ propertyName: "prevElRef", first: true, predicate: ["prevElRef"], descendants: true }, { propertyName: "nextElRef", first: true, predicate: ["nextElRef"], descendants: true }, { propertyName: "scrollbarElRef", first: true, predicate: ["scrollbarElRef"], descendants: true }, { propertyName: "paginationElRef", first: true, predicate: ["paginationElRef"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<ng-content select=\"[slot=container-start]\"></ng-content>\n<ng-container *ngIf=\"navigation && showNavigation\">\n  <div class=\"swiper-button-prev\" #prevElRef></div>\n  <div class=\"swiper-button-next\" #nextElRef></div>\n</ng-container>\n<div *ngIf=\"scrollbar && showScrollbar\" class=\"swiper-scrollbar\" #scrollbarElRef></div>\n<div *ngIf=\"pagination && showPagination\" class=\"swiper-pagination\" #paginationElRef></div>\n<div [ngClass]=\"wrapperClass\" [attr.id]=\"id\">\n  <ng-content select=\"[slot=wrapper-start]\"></ng-content>\n  <ng-template\n    *ngTemplateOutlet=\"\n      slidesTemplate;\n      context: {\n        loopSlides: prependSlides,\n        key: 'prepend'\n      }\n    \"\n  ></ng-template>\n  <ng-template\n    *ngTemplateOutlet=\"\n      slidesTemplate;\n      context: {\n        loopSlides: activeSlides,\n        key: ''\n      }\n    \"\n  ></ng-template>\n  <ng-template\n    *ngTemplateOutlet=\"\n      slidesTemplate;\n      context: {\n        loopSlides: appendSlides,\n        key: 'append'\n      }\n    \"\n  ></ng-template>\n  <ng-content select=\"[slot=wrapper-end]\"></ng-content>\n</div>\n<ng-content select=\"[slot=container-end]\"></ng-content>\n\n<ng-template #slidesTemplate let-loopSlides=\"loopSlides\" let-slideKey=\"key\">\n  <div\n    *ngFor=\"let slide of loopSlides | async\"\n    [ngClass]=\"\n      (slide.class ? slide.class + ' ' : '') +\n      slideClass +\n      (slideKey !== '' ? ' ' + slideDuplicateClass : '')\n    \"\n    [attr.data-swiper-slide-index]=\"slide.virtualIndex ? slide.virtualIndex : slide.slideIndex\"\n    [attr.data-swiper-autoplay]=\"slide.autoplayDelay\"\n    [style]=\"style\"\n    [ngSwitch]=\"slide.zoom\"\n  >\n    <div *ngSwitchCase=\"true\" [ngClass]=\"zoomContainerClass\">\n      <ng-template\n        [ngTemplateOutlet]=\"slide.template\"\n        [ngTemplateOutletContext]=\"{\n          $implicit: slide.slideData\n        }\"\n      ></ng-template>\n    </div>\n    <ng-container *ngSwitchDefault>\n      <ng-template\n        [ngTemplateOutlet]=\"slide.template\"\n        [ngTemplateOutletContext]=\"{\n          $implicit: slide.slideData\n        }\"\n      ></ng-template>\n    </ng-container>\n  </div>\n</ng-template>\n", styles: ["swiper{display:block}\n"], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i1.NgSwitchDefault, selector: "[ngSwitchDefault]" }], pipes: { "async": i1.AsyncPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: SwiperComponent, decorators: [{
            type: Component,
            args: [{ selector: 'swiper, [swiper]', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, styles: [
                        `
      swiper {
        display: block;
      }
    `,
                    ], template: "<ng-content select=\"[slot=container-start]\"></ng-content>\n<ng-container *ngIf=\"navigation && showNavigation\">\n  <div class=\"swiper-button-prev\" #prevElRef></div>\n  <div class=\"swiper-button-next\" #nextElRef></div>\n</ng-container>\n<div *ngIf=\"scrollbar && showScrollbar\" class=\"swiper-scrollbar\" #scrollbarElRef></div>\n<div *ngIf=\"pagination && showPagination\" class=\"swiper-pagination\" #paginationElRef></div>\n<div [ngClass]=\"wrapperClass\" [attr.id]=\"id\">\n  <ng-content select=\"[slot=wrapper-start]\"></ng-content>\n  <ng-template\n    *ngTemplateOutlet=\"\n      slidesTemplate;\n      context: {\n        loopSlides: prependSlides,\n        key: 'prepend'\n      }\n    \"\n  ></ng-template>\n  <ng-template\n    *ngTemplateOutlet=\"\n      slidesTemplate;\n      context: {\n        loopSlides: activeSlides,\n        key: ''\n      }\n    \"\n  ></ng-template>\n  <ng-template\n    *ngTemplateOutlet=\"\n      slidesTemplate;\n      context: {\n        loopSlides: appendSlides,\n        key: 'append'\n      }\n    \"\n  ></ng-template>\n  <ng-content select=\"[slot=wrapper-end]\"></ng-content>\n</div>\n<ng-content select=\"[slot=container-end]\"></ng-content>\n\n<ng-template #slidesTemplate let-loopSlides=\"loopSlides\" let-slideKey=\"key\">\n  <div\n    *ngFor=\"let slide of loopSlides | async\"\n    [ngClass]=\"\n      (slide.class ? slide.class + ' ' : '') +\n      slideClass +\n      (slideKey !== '' ? ' ' + slideDuplicateClass : '')\n    \"\n    [attr.data-swiper-slide-index]=\"slide.virtualIndex ? slide.virtualIndex : slide.slideIndex\"\n    [attr.data-swiper-autoplay]=\"slide.autoplayDelay\"\n    [style]=\"style\"\n    [ngSwitch]=\"slide.zoom\"\n  >\n    <div *ngSwitchCase=\"true\" [ngClass]=\"zoomContainerClass\">\n      <ng-template\n        [ngTemplateOutlet]=\"slide.template\"\n        [ngTemplateOutletContext]=\"{\n          $implicit: slide.slideData\n        }\"\n      ></ng-template>\n    </div>\n    <ng-container *ngSwitchDefault>\n      <ng-template\n        [ngTemplateOutlet]=\"slide.template\"\n        [ngTemplateOutletContext]=\"{\n          $implicit: slide.slideData\n        }\"\n      ></ng-template>\n    </ng-container>\n  </div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }]; }, propDecorators: { enabled: [{
                type: Input
            }], on: [{
                type: Input
            }], direction: [{
                type: Input
            }], touchEventsTarget: [{
                type: Input
            }], initialSlide: [{
                type: Input
            }], speed: [{
                type: Input
            }], cssMode: [{
                type: Input
            }], updateOnWindowResize: [{
                type: Input
            }], resizeObserver: [{
                type: Input
            }], nested: [{
                type: Input
            }], focusableElements: [{
                type: Input
            }], width: [{
                type: Input
            }], height: [{
                type: Input
            }], preventInteractionOnTransition: [{
                type: Input
            }], userAgent: [{
                type: Input
            }], url: [{
                type: Input
            }], edgeSwipeDetection: [{
                type: Input
            }], edgeSwipeThreshold: [{
                type: Input
            }], freeMode: [{
                type: Input
            }], autoHeight: [{
                type: Input
            }], setWrapperSize: [{
                type: Input
            }], virtualTranslate: [{
                type: Input
            }], effect: [{
                type: Input
            }], breakpoints: [{
                type: Input
            }], spaceBetween: [{
                type: Input
            }], slidesPerView: [{
                type: Input
            }], maxBackfaceHiddenSlides: [{
                type: Input
            }], grid: [{
                type: Input
            }], slidesPerGroup: [{
                type: Input
            }], slidesPerGroupSkip: [{
                type: Input
            }], centeredSlides: [{
                type: Input
            }], centeredSlidesBounds: [{
                type: Input
            }], slidesOffsetBefore: [{
                type: Input
            }], slidesOffsetAfter: [{
                type: Input
            }], normalizeSlideIndex: [{
                type: Input
            }], centerInsufficientSlides: [{
                type: Input
            }], watchOverflow: [{
                type: Input
            }], roundLengths: [{
                type: Input
            }], touchRatio: [{
                type: Input
            }], touchAngle: [{
                type: Input
            }], simulateTouch: [{
                type: Input
            }], shortSwipes: [{
                type: Input
            }], longSwipes: [{
                type: Input
            }], longSwipesRatio: [{
                type: Input
            }], longSwipesMs: [{
                type: Input
            }], followFinger: [{
                type: Input
            }], allowTouchMove: [{
                type: Input
            }], threshold: [{
                type: Input
            }], touchMoveStopPropagation: [{
                type: Input
            }], touchStartPreventDefault: [{
                type: Input
            }], touchStartForcePreventDefault: [{
                type: Input
            }], touchReleaseOnEdges: [{
                type: Input
            }], uniqueNavElements: [{
                type: Input
            }], resistance: [{
                type: Input
            }], resistanceRatio: [{
                type: Input
            }], watchSlidesProgress: [{
                type: Input
            }], grabCursor: [{
                type: Input
            }], preventClicks: [{
                type: Input
            }], preventClicksPropagation: [{
                type: Input
            }], slideToClickedSlide: [{
                type: Input
            }], preloadImages: [{
                type: Input
            }], updateOnImagesReady: [{
                type: Input
            }], loop: [{
                type: Input
            }], loopAdditionalSlides: [{
                type: Input
            }], loopedSlides: [{
                type: Input
            }], loopedSlidesLimit: [{
                type: Input
            }], loopFillGroupWithBlank: [{
                type: Input
            }], loopPreventsSlide: [{
                type: Input
            }], rewind: [{
                type: Input
            }], allowSlidePrev: [{
                type: Input
            }], allowSlideNext: [{
                type: Input
            }], swipeHandler: [{
                type: Input
            }], noSwiping: [{
                type: Input
            }], noSwipingClass: [{
                type: Input
            }], noSwipingSelector: [{
                type: Input
            }], passiveListeners: [{
                type: Input
            }], containerModifierClass: [{
                type: Input
            }], slideClass: [{
                type: Input
            }], slideBlankClass: [{
                type: Input
            }], slideActiveClass: [{
                type: Input
            }], slideDuplicateActiveClass: [{
                type: Input
            }], slideVisibleClass: [{
                type: Input
            }], slideDuplicateClass: [{
                type: Input
            }], slideNextClass: [{
                type: Input
            }], slideDuplicateNextClass: [{
                type: Input
            }], slidePrevClass: [{
                type: Input
            }], slideDuplicatePrevClass: [{
                type: Input
            }], wrapperClass: [{
                type: Input
            }], runCallbacksOnInit: [{
                type: Input
            }], observeParents: [{
                type: Input
            }], observeSlideChildren: [{
                type: Input
            }], a11y: [{
                type: Input
            }], autoplay: [{
                type: Input
            }], controller: [{
                type: Input
            }], coverflowEffect: [{
                type: Input
            }], cubeEffect: [{
                type: Input
            }], fadeEffect: [{
                type: Input
            }], flipEffect: [{
                type: Input
            }], creativeEffect: [{
                type: Input
            }], cardsEffect: [{
                type: Input
            }], hashNavigation: [{
                type: Input
            }], history: [{
                type: Input
            }], keyboard: [{
                type: Input
            }], lazy: [{
                type: Input
            }], mousewheel: [{
                type: Input
            }], parallax: [{
                type: Input
            }], thumbs: [{
                type: Input
            }], zoom: [{
                type: Input
            }], slidesPerGroupAuto: [{
                type: Input
            }], class: [{
                type: Input
            }], id: [{
                type: Input
            }], navigation: [{
                type: Input
            }], pagination: [{
                type: Input
            }], scrollbar: [{
                type: Input
            }], virtual: [{
                type: Input
            }], config: [{
                type: Input
            }], s__beforeBreakpoint: [{
                type: Output,
                args: ['_beforeBreakpoint']
            }], s__containerClasses: [{
                type: Output,
                args: ['_containerClasses']
            }], s__slideClass: [{
                type: Output,
                args: ['_slideClass']
            }], s__swiper: [{
                type: Output,
                args: ['_swiper']
            }], s_activeIndexChange: [{
                type: Output,
                args: ['activeIndexChange']
            }], s_afterInit: [{
                type: Output,
                args: ['afterInit']
            }], s_autoplay: [{
                type: Output,
                args: ['autoplay']
            }], s_autoplayStart: [{
                type: Output,
                args: ['autoplayStart']
            }], s_autoplayStop: [{
                type: Output,
                args: ['autoplayStop']
            }], s_autoplayPause: [{
                type: Output,
                args: ['autoplayPause']
            }], s_autoplayResume: [{
                type: Output,
                args: ['autoplayResume']
            }], s_beforeDestroy: [{
                type: Output,
                args: ['beforeDestroy']
            }], s_beforeInit: [{
                type: Output,
                args: ['beforeInit']
            }], s_beforeLoopFix: [{
                type: Output,
                args: ['beforeLoopFix']
            }], s_beforeResize: [{
                type: Output,
                args: ['beforeResize']
            }], s_beforeSlideChangeStart: [{
                type: Output,
                args: ['beforeSlideChangeStart']
            }], s_beforeTransitionStart: [{
                type: Output,
                args: ['beforeTransitionStart']
            }], s_breakpoint: [{
                type: Output,
                args: ['breakpoint']
            }], s_changeDirection: [{
                type: Output,
                args: ['changeDirection']
            }], s_click: [{
                type: Output,
                args: ['click']
            }], s_doubleTap: [{
                type: Output,
                args: ['doubleTap']
            }], s_doubleClick: [{
                type: Output,
                args: ['doubleClick']
            }], s_destroy: [{
                type: Output,
                args: ['destroy']
            }], s_fromEdge: [{
                type: Output,
                args: ['fromEdge']
            }], s_hashChange: [{
                type: Output,
                args: ['hashChange']
            }], s_hashSet: [{
                type: Output,
                args: ['hashSet']
            }], s_imagesReady: [{
                type: Output,
                args: ['imagesReady']
            }], s_init: [{
                type: Output,
                args: ['init']
            }], s_keyPress: [{
                type: Output,
                args: ['keyPress']
            }], s_lazyImageLoad: [{
                type: Output,
                args: ['lazyImageLoad']
            }], s_lazyImageReady: [{
                type: Output,
                args: ['lazyImageReady']
            }], s_loopFix: [{
                type: Output,
                args: ['loopFix']
            }], s_momentumBounce: [{
                type: Output,
                args: ['momentumBounce']
            }], s_navigationHide: [{
                type: Output,
                args: ['navigationHide']
            }], s_navigationShow: [{
                type: Output,
                args: ['navigationShow']
            }], s_navigationPrev: [{
                type: Output,
                args: ['navigationPrev']
            }], s_navigationNext: [{
                type: Output,
                args: ['navigationNext']
            }], s_observerUpdate: [{
                type: Output,
                args: ['observerUpdate']
            }], s_orientationchange: [{
                type: Output,
                args: ['orientationchange']
            }], s_paginationHide: [{
                type: Output,
                args: ['paginationHide']
            }], s_paginationRender: [{
                type: Output,
                args: ['paginationRender']
            }], s_paginationShow: [{
                type: Output,
                args: ['paginationShow']
            }], s_paginationUpdate: [{
                type: Output,
                args: ['paginationUpdate']
            }], s_progress: [{
                type: Output,
                args: ['progress']
            }], s_reachBeginning: [{
                type: Output,
                args: ['reachBeginning']
            }], s_reachEnd: [{
                type: Output,
                args: ['reachEnd']
            }], s_realIndexChange: [{
                type: Output,
                args: ['realIndexChange']
            }], s_resize: [{
                type: Output,
                args: ['resize']
            }], s_scroll: [{
                type: Output,
                args: ['scroll']
            }], s_scrollbarDragEnd: [{
                type: Output,
                args: ['scrollbarDragEnd']
            }], s_scrollbarDragMove: [{
                type: Output,
                args: ['scrollbarDragMove']
            }], s_scrollbarDragStart: [{
                type: Output,
                args: ['scrollbarDragStart']
            }], s_setTransition: [{
                type: Output,
                args: ['setTransition']
            }], s_setTranslate: [{
                type: Output,
                args: ['setTranslate']
            }], s_slideChange: [{
                type: Output,
                args: ['slideChange']
            }], s_slideChangeTransitionEnd: [{
                type: Output,
                args: ['slideChangeTransitionEnd']
            }], s_slideChangeTransitionStart: [{
                type: Output,
                args: ['slideChangeTransitionStart']
            }], s_slideNextTransitionEnd: [{
                type: Output,
                args: ['slideNextTransitionEnd']
            }], s_slideNextTransitionStart: [{
                type: Output,
                args: ['slideNextTransitionStart']
            }], s_slidePrevTransitionEnd: [{
                type: Output,
                args: ['slidePrevTransitionEnd']
            }], s_slidePrevTransitionStart: [{
                type: Output,
                args: ['slidePrevTransitionStart']
            }], s_slideResetTransitionStart: [{
                type: Output,
                args: ['slideResetTransitionStart']
            }], s_slideResetTransitionEnd: [{
                type: Output,
                args: ['slideResetTransitionEnd']
            }], s_sliderMove: [{
                type: Output,
                args: ['sliderMove']
            }], s_sliderFirstMove: [{
                type: Output,
                args: ['sliderFirstMove']
            }], s_slidesLengthChange: [{
                type: Output,
                args: ['slidesLengthChange']
            }], s_slidesGridLengthChange: [{
                type: Output,
                args: ['slidesGridLengthChange']
            }], s_snapGridLengthChange: [{
                type: Output,
                args: ['snapGridLengthChange']
            }], s_snapIndexChange: [{
                type: Output,
                args: ['snapIndexChange']
            }], s_tap: [{
                type: Output,
                args: ['tap']
            }], s_toEdge: [{
                type: Output,
                args: ['toEdge']
            }], s_touchEnd: [{
                type: Output,
                args: ['touchEnd']
            }], s_touchMove: [{
                type: Output,
                args: ['touchMove']
            }], s_touchMoveOpposite: [{
                type: Output,
                args: ['touchMoveOpposite']
            }], s_touchStart: [{
                type: Output,
                args: ['touchStart']
            }], s_transitionEnd: [{
                type: Output,
                args: ['transitionEnd']
            }], s_transitionStart: [{
                type: Output,
                args: ['transitionStart']
            }], s_update: [{
                type: Output,
                args: ['update']
            }], s_zoomChange: [{
                type: Output,
                args: ['zoomChange']
            }], s_swiper: [{
                type: Output,
                args: ['swiper']
            }], s_lock: [{
                type: Output,
                args: ['lock']
            }], s_unlock: [{
                type: Output,
                args: ['unlock']
            }], prevElRef: [{
                type: ViewChild,
                args: ['prevElRef', { static: false }]
            }], nextElRef: [{
                type: ViewChild,
                args: ['nextElRef', { static: false }]
            }], scrollbarElRef: [{
                type: ViewChild,
                args: ['scrollbarElRef', { static: false }]
            }], paginationElRef: [{
                type: ViewChild,
                args: ['paginationElRef', { static: false }]
            }], slidesEl: [{
                type: ContentChildren,
                args: [SwiperSlideDirective, { descendants: false, emitDistinctChangesOnly: true }]
            }], containerClasses: [{
                type: HostBinding,
                args: ['class']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpcGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hbmd1bGFyL3NyYy9zd2lwZXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vc3JjL2FuZ3VsYXIvc3JjL3N3aXBlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxlQUFlLEVBRWYsWUFBWSxFQUNaLFdBQVcsRUFDWCxNQUFNLEVBQ04sS0FBSyxFQUdMLE1BQU0sRUFDTixXQUFXLEVBR1gsU0FBUyxFQUNULGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixhQUFhO0FBQ2IsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE9BQU8sRUFBYyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVoRSxPQUFPLEVBQ0wsTUFBTSxFQUNOLFFBQVEsRUFDUixXQUFXLEVBQ1gsaUJBQWlCLEVBQ2pCLHFCQUFxQixFQUNyQixRQUFRLEVBQ1IsU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBU3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7QUFjcEQsTUFBTSxPQUFPLGVBQWU7SUEyYzFCLFlBQ1UsT0FBZSxFQUNmLFVBQXNCLEVBQ3RCLGtCQUFxQyxFQUNoQixXQUFtQjtRQUh4QyxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2YsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBQ2hCLGdCQUFXLEdBQVgsV0FBVyxDQUFRO1FBall6QyxlQUFVLEdBQWdDLGNBQWMsQ0FBQztRQVV6RCxp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RSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7Z0JBTzFDLGVBQWU7c0JBRGxCLFNBQVM7dUJBQUMsaUJBQWlCLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO2dCQU8vQyxRQUFRO3NCQURQLGVBQWU7dUJBQUMsb0JBQW9CLEVBQUUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFFLElBQUksRUFBRTtnQkF1QnRFLGdCQUFnQjtzQkFBckMsV0FBVzt1QkFBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0QmluZGluZyxcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgUExBVEZPUk1fSUQsXG4gIFF1ZXJ5TGlzdCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vLyBAdHMtaWdub3JlXG5pbXBvcnQgU3dpcGVyIGZyb20gJ3N3aXBlcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZ2V0UGFyYW1zIH0gZnJvbSAnLi91dGlscy9nZXQtcGFyYW1zJztcbmltcG9ydCB7IFN3aXBlclNsaWRlRGlyZWN0aXZlIH0gZnJvbSAnLi9zd2lwZXItc2xpZGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IEV2ZW50c1BhcmFtcyB9IGZyb20gJy4vc3dpcGVyLWV2ZW50cyc7XG5pbXBvcnQge1xuICBleHRlbmQsXG4gIGlzT2JqZWN0LFxuICBzZXRQcm9wZXJ0eSxcbiAgaWdub3JlTmdPbkNoYW5nZXMsXG4gIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSxcbiAgaXNTaG93RWwsXG4gIGlzRW5hYmxlZCxcbn0gZnJvbSAnLi91dGlscy91dGlscyc7XG5pbXBvcnQge1xuICBTd2lwZXJPcHRpb25zLFxuICBTd2lwZXJFdmVudHMsXG4gIE5hdmlnYXRpb25PcHRpb25zLFxuICBQYWdpbmF0aW9uT3B0aW9ucyxcbiAgU2Nyb2xsYmFyT3B0aW9ucyxcbiAgVmlydHVhbE9wdGlvbnMsXG59IGZyb20gJ3N3aXBlci90eXBlcyc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzd2lwZXIsIFtzd2lwZXJdJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3N3aXBlci5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgICBzd2lwZXIge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgIH1cbiAgICBgLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBTd2lwZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBlbmFibGVkOiBTd2lwZXJPcHRpb25zWydlbmFibGVkJ107XG4gIEBJbnB1dCgpIG9uOiBTd2lwZXJPcHRpb25zWydvbiddO1xuICBASW5wdXQoKSBkaXJlY3Rpb246IFN3aXBlck9wdGlvbnNbJ2RpcmVjdGlvbiddO1xuICBASW5wdXQoKSB0b3VjaEV2ZW50c1RhcmdldDogU3dpcGVyT3B0aW9uc1sndG91Y2hFdmVudHNUYXJnZXQnXTtcbiAgQElucHV0KCkgaW5pdGlhbFNsaWRlOiBTd2lwZXJPcHRpb25zWydpbml0aWFsU2xpZGUnXTtcbiAgQElucHV0KCkgc3BlZWQ6IFN3aXBlck9wdGlvbnNbJ3NwZWVkJ107XG4gIEBJbnB1dCgpIGNzc01vZGU6IFN3aXBlck9wdGlvbnNbJ2Nzc01vZGUnXTtcbiAgQElucHV0KCkgdXBkYXRlT25XaW5kb3dSZXNpemU6IFN3aXBlck9wdGlvbnNbJ3VwZGF0ZU9uV2luZG93UmVzaXplJ107XG4gIEBJbnB1dCgpIHJlc2l6ZU9ic2VydmVyOiBTd2lwZXJPcHRpb25zWydyZXNpemVPYnNlcnZlciddO1xuICBASW5wdXQoKSBuZXN0ZWQ6IFN3aXBlck9wdGlvbnNbJ25lc3RlZCddO1xuICBASW5wdXQoKSBmb2N1c2FibGVFbGVtZW50czogU3dpcGVyT3B0aW9uc1snZm9jdXNhYmxlRWxlbWVudHMnXTtcbiAgQElucHV0KCkgd2lkdGg6IFN3aXBlck9wdGlvbnNbJ3dpZHRoJ107XG4gIEBJbnB1dCgpIGhlaWdodDogU3dpcGVyT3B0aW9uc1snaGVpZ2h0J107XG4gIEBJbnB1dCgpIHByZXZlbnRJbnRlcmFjdGlvbk9uVHJhbnNpdGlvbjogU3dpcGVyT3B0aW9uc1sncHJldmVudEludGVyYWN0aW9uT25UcmFuc2l0aW9uJ107XG4gIEBJbnB1dCgpIHVzZXJBZ2VudDogU3dpcGVyT3B0aW9uc1sndXNlckFnZW50J107XG4gIEBJbnB1dCgpIHVybDogU3dpcGVyT3B0aW9uc1sndXJsJ107XG4gIEBJbnB1dCgpIGVkZ2VTd2lwZURldGVjdGlvbjogYm9vbGVhbiB8IHN0cmluZztcbiAgQElucHV0KCkgZWRnZVN3aXBlVGhyZXNob2xkOiBudW1iZXI7XG4gIEBJbnB1dCgpIGZyZWVNb2RlOiBTd2lwZXJPcHRpb25zWydmcmVlTW9kZSddO1xuICBASW5wdXQoKSBhdXRvSGVpZ2h0OiBTd2lwZXJPcHRpb25zWydhdXRvSGVpZ2h0J107XG4gIEBJbnB1dCgpIHNldFdyYXBwZXJTaXplOiBTd2lwZXJPcHRpb25zWydzZXRXcmFwcGVyU2l6ZSddO1xuICBASW5wdXQoKSB2aXJ0dWFsVHJhbnNsYXRlOiBTd2lwZXJPcHRpb25zWyd2aXJ0dWFsVHJhbnNsYXRlJ107XG4gIEBJbnB1dCgpIGVmZmVjdDogU3dpcGVyT3B0aW9uc1snZWZmZWN0J107XG4gIEBJbnB1dCgpIGJyZWFrcG9pbnRzOiBTd2lwZXJPcHRpb25zWydicmVha3BvaW50cyddO1xuICBASW5wdXQoKSBzcGFjZUJldHdlZW46IFN3aXBlck9wdGlvbnNbJ3NwYWNlQmV0d2VlbiddO1xuICBASW5wdXQoKSBzbGlkZXNQZXJWaWV3OiBTd2lwZXJPcHRpb25zWydzbGlkZXNQZXJWaWV3J107XG4gIEBJbnB1dCgpIG1heEJhY2tmYWNlSGlkZGVuU2xpZGVzOiBTd2lwZXJPcHRpb25zWydtYXhCYWNrZmFjZUhpZGRlblNsaWRlcyddO1xuICBASW5wdXQoKSBncmlkOiBTd2lwZXJPcHRpb25zWydncmlkJ107XG4gIEBJbnB1dCgpIHNsaWRlc1Blckdyb3VwOiBTd2lwZXJPcHRpb25zWydzbGlkZXNQZXJHcm91cCddO1xuICBASW5wdXQoKSBzbGlkZXNQZXJHcm91cFNraXA6IFN3aXBlck9wdGlvbnNbJ3NsaWRlc1Blckdyb3VwU2tpcCddO1xuICBASW5wdXQoKSBjZW50ZXJlZFNsaWRlczogU3dpcGVyT3B0aW9uc1snY2VudGVyZWRTbGlkZXMnXTtcbiAgQElucHV0KCkgY2VudGVyZWRTbGlkZXNCb3VuZHM6IFN3aXBlck9wdGlvbnNbJ2NlbnRlcmVkU2xpZGVzQm91bmRzJ107XG4gIEBJbnB1dCgpIHNsaWRlc09mZnNldEJlZm9yZTogU3dpcGVyT3B0aW9uc1snc2xpZGVzT2Zmc2V0QmVmb3JlJ107XG4gIEBJbnB1dCgpIHNsaWRlc09mZnNldEFmdGVyOiBTd2lwZXJPcHRpb25zWydzbGlkZXNPZmZzZXRBZnRlciddO1xuICBASW5wdXQoKSBub3JtYWxpemVTbGlkZUluZGV4OiBTd2lwZXJPcHRpb25zWydub3JtYWxpemVTbGlkZUluZGV4J107XG4gIEBJbnB1dCgpIGNlbnRlckluc3VmZmljaWVudFNsaWRlczogU3dpcGVyT3B0aW9uc1snY2VudGVySW5zdWZmaWNpZW50U2xpZGVzJ107XG4gIEBJbnB1dCgpIHdhdGNoT3ZlcmZsb3c6IFN3aXBlck9wdGlvbnNbJ3dhdGNoT3ZlcmZsb3cnXTtcbiAgQElucHV0KCkgcm91bmRMZW5ndGhzOiBTd2lwZXJPcHRpb25zWydyb3VuZExlbmd0aHMnXTtcbiAgQElucHV0KCkgdG91Y2hSYXRpbzogU3dpcGVyT3B0aW9uc1sndG91Y2hSYXRpbyddO1xuICBASW5wdXQoKSB0b3VjaEFuZ2xlOiBTd2lwZXJPcHRpb25zWyd0b3VjaEFuZ2xlJ107XG4gIEBJbnB1dCgpIHNpbXVsYXRlVG91Y2g6IFN3aXBlck9wdGlvbnNbJ3NpbXVsYXRlVG91Y2gnXTtcbiAgQElucHV0KCkgc2hvcnRTd2lwZXM6IFN3aXBlck9wdGlvbnNbJ3Nob3J0U3dpcGVzJ107XG4gIEBJbnB1dCgpIGxvbmdTd2lwZXM6IFN3aXBlck9wdGlvbnNbJ2xvbmdTd2lwZXMnXTtcbiAgQElucHV0KCkgbG9uZ1N3aXBlc1JhdGlvOiBTd2lwZXJPcHRpb25zWydsb25nU3dpcGVzUmF0aW8nXTtcbiAgQElucHV0KCkgbG9uZ1N3aXBlc01zOiBTd2lwZXJPcHRpb25zWydsb25nU3dpcGVzTXMnXTtcbiAgQElucHV0KCkgZm9sbG93RmluZ2VyOiBTd2lwZXJPcHRpb25zWydmb2xsb3dGaW5nZXInXTtcbiAgQElucHV0KCkgYWxsb3dUb3VjaE1vdmU6IFN3aXBlck9wdGlvbnNbJ2FsbG93VG91Y2hNb3ZlJ107XG4gIEBJbnB1dCgpIHRocmVzaG9sZDogU3dpcGVyT3B0aW9uc1sndGhyZXNob2xkJ107XG4gIEBJbnB1dCgpIHRvdWNoTW92ZVN0b3BQcm9wYWdhdGlvbjogU3dpcGVyT3B0aW9uc1sndG91Y2hNb3ZlU3RvcFByb3BhZ2F0aW9uJ107XG4gIEBJbnB1dCgpIHRvdWNoU3RhcnRQcmV2ZW50RGVmYXVsdDogU3dpcGVyT3B0aW9uc1sndG91Y2hTdGFydFByZXZlbnREZWZhdWx0J107XG4gIEBJbnB1dCgpIHRvdWNoU3RhcnRGb3JjZVByZXZlbnREZWZhdWx0OiBTd2lwZXJPcHRpb25zWyd0b3VjaFN0YXJ0Rm9yY2VQcmV2ZW50RGVmYXVsdCddO1xuICBASW5wdXQoKSB0b3VjaFJlbGVhc2VPbkVkZ2VzOiBTd2lwZXJPcHRpb25zWyd0b3VjaFJlbGVhc2VPbkVkZ2VzJ107XG4gIEBJbnB1dCgpIHVuaXF1ZU5hdkVsZW1lbnRzOiBTd2lwZXJPcHRpb25zWyd1bmlxdWVOYXZFbGVtZW50cyddO1xuICBASW5wdXQoKSByZXNpc3RhbmNlOiBTd2lwZXJPcHRpb25zWydyZXNpc3RhbmNlJ107XG4gIEBJbnB1dCgpIHJlc2lzdGFuY2VSYXRpbzogU3dpcGVyT3B0aW9uc1sncmVzaXN0YW5jZVJhdGlvJ107XG4gIEBJbnB1dCgpIHdhdGNoU2xpZGVzUHJvZ3Jlc3M6IFN3aXBlck9wdGlvbnNbJ3dhdGNoU2xpZGVzUHJvZ3Jlc3MnXTtcbiAgQElucHV0KCkgZ3JhYkN1cnNvcjogU3dpcGVyT3B0aW9uc1snZ3JhYkN1cnNvciddO1xuICBASW5wdXQoKSBwcmV2ZW50Q2xpY2tzOiBTd2lwZXJPcHRpb25zWydwcmV2ZW50Q2xpY2tzJ107XG4gIEBJbnB1dCgpIHByZXZlbnRDbGlja3NQcm9wYWdhdGlvbjogU3dpcGVyT3B0aW9uc1sncHJldmVudENsaWNrc1Byb3BhZ2F0aW9uJ107XG4gIEBJbnB1dCgpIHNsaWRlVG9DbGlja2VkU2xpZGU6IFN3aXBlck9wdGlvbnNbJ3NsaWRlVG9DbGlja2VkU2xpZGUnXTtcbiAgQElucHV0KCkgcHJlbG9hZEltYWdlczogU3dpcGVyT3B0aW9uc1sncHJlbG9hZEltYWdlcyddO1xuICBASW5wdXQoKSB1cGRhdGVPbkltYWdlc1JlYWR5OiBTd2lwZXJPcHRpb25zWyd1cGRhdGVPbkltYWdlc1JlYWR5J107XG4gIEBJbnB1dCgpIGxvb3A6IFN3aXBlck9wdGlvbnNbJ2xvb3AnXTtcbiAgQElucHV0KCkgbG9vcEFkZGl0aW9uYWxTbGlkZXM6IFN3aXBlck9wdGlvbnNbJ2xvb3BBZGRpdGlvbmFsU2xpZGVzJ107XG4gIEBJbnB1dCgpIGxvb3BlZFNsaWRlczogU3dpcGVyT3B0aW9uc1snbG9vcGVkU2xpZGVzJ107XG4gIEBJbnB1dCgpIGxvb3BlZFNsaWRlc0xpbWl0OiBTd2lwZXJPcHRpb25zWydsb29wZWRTbGlkZXNMaW1pdCddO1xuICBASW5wdXQoKSBsb29wRmlsbEdyb3VwV2l0aEJsYW5rOiBTd2lwZXJPcHRpb25zWydsb29wRmlsbEdyb3VwV2l0aEJsYW5rJ107XG4gIEBJbnB1dCgpIGxvb3BQcmV2ZW50c1NsaWRlOiBTd2lwZXJPcHRpb25zWydsb29wUHJldmVudHNTbGlkZSddO1xuICBASW5wdXQoKSByZXdpbmQ6IFN3aXBlck9wdGlvbnNbJ3Jld2luZCddO1xuICBASW5wdXQoKSBhbGxvd1NsaWRlUHJldjogU3dpcGVyT3B0aW9uc1snYWxsb3dTbGlkZVByZXYnXTtcbiAgQElucHV0KCkgYWxsb3dTbGlkZU5leHQ6IFN3aXBlck9wdGlvbnNbJ2FsbG93U2xpZGVOZXh0J107XG4gIEBJbnB1dCgpIHN3aXBlSGFuZGxlcjogU3dpcGVyT3B0aW9uc1snc3dpcGVIYW5kbGVyJ107XG4gIEBJbnB1dCgpIG5vU3dpcGluZzogU3dpcGVyT3B0aW9uc1snbm9Td2lwaW5nJ107XG4gIEBJbnB1dCgpIG5vU3dpcGluZ0NsYXNzOiBTd2lwZXJPcHRpb25zWydub1N3aXBpbmdDbGFzcyddO1xuICBASW5wdXQoKSBub1N3aXBpbmdTZWxlY3RvcjogU3dpcGVyT3B0aW9uc1snbm9Td2lwaW5nU2VsZWN0b3InXTtcbiAgQElucHV0KCkgcGFzc2l2ZUxpc3RlbmVyczogU3dpcGVyT3B0aW9uc1sncGFzc2l2ZUxpc3RlbmVycyddO1xuICBASW5wdXQoKSBjb250YWluZXJNb2RpZmllckNsYXNzOiBTd2lwZXJPcHRpb25zWydjb250YWluZXJNb2RpZmllckNsYXNzJ107XG4gIEBJbnB1dCgpIHNsaWRlQ2xhc3M6IFN3aXBlck9wdGlvbnNbJ3NsaWRlQ2xhc3MnXSA9ICdzd2lwZXItc2xpZGUnO1xuICBASW5wdXQoKSBzbGlkZUJsYW5rQ2xhc3M6IFN3aXBlck9wdGlvbnNbJ3NsaWRlQmxhbmtDbGFzcyddO1xuICBASW5wdXQoKSBzbGlkZUFjdGl2ZUNsYXNzOiBTd2lwZXJPcHRpb25zWydzbGlkZUFjdGl2ZUNsYXNzJ107XG4gIEBJbnB1dCgpIHNsaWRlRHVwbGljYXRlQWN0aXZlQ2xhc3M6IFN3aXBlck9wdGlvbnNbJ3NsaWRlRHVwbGljYXRlQWN0aXZlQ2xhc3MnXTtcbiAgQElucHV0KCkgc2xpZGVWaXNpYmxlQ2xhc3M6IFN3aXBlck9wdGlvbnNbJ3NsaWRlVmlzaWJsZUNsYXNzJ107XG4gIEBJbnB1dCgpIHNsaWRlRHVwbGljYXRlQ2xhc3M6IFN3aXBlck9wdGlvbnNbJ3NsaWRlRHVwbGljYXRlQ2xhc3MnXTtcbiAgQElucHV0KCkgc2xpZGVOZXh0Q2xhc3M6IFN3aXBlck9wdGlvbnNbJ3NsaWRlTmV4dENsYXNzJ107XG4gIEBJbnB1dCgpIHNsaWRlRHVwbGljYXRlTmV4dENsYXNzOiBTd2lwZXJPcHRpb25zWydzbGlkZUR1cGxpY2F0ZU5leHRDbGFzcyddO1xuICBASW5wdXQoKSBzbGlkZVByZXZDbGFzczogU3dpcGVyT3B0aW9uc1snc2xpZGVQcmV2Q2xhc3MnXTtcbiAgQElucHV0KCkgc2xpZGVEdXBsaWNhdGVQcmV2Q2xhc3M6IFN3aXBlck9wdGlvbnNbJ3NsaWRlRHVwbGljYXRlUHJldkNsYXNzJ107XG4gIEBJbnB1dCgpIHdyYXBwZXJDbGFzczogU3dpcGVyT3B0aW9uc1snd3JhcHBlckNsYXNzJ10gPSAnc3dpcGVyLXdyYXBwZXInO1xuICBASW5wdXQoKSBydW5DYWxsYmFja3NPbkluaXQ6IFN3aXBlck9wdGlvbnNbJ3J1bkNhbGxiYWNrc09uSW5pdCddO1xuICBASW5wdXQoKSBvYnNlcnZlUGFyZW50czogU3dpcGVyT3B0aW9uc1snb2JzZXJ2ZVBhcmVudHMnXTtcbiAgQElucHV0KCkgb2JzZXJ2ZVNsaWRlQ2hpbGRyZW46IFN3aXBlck9wdGlvbnNbJ29ic2VydmVTbGlkZUNoaWxkcmVuJ107XG4gIEBJbnB1dCgpIGExMXk6IFN3aXBlck9wdGlvbnNbJ2ExMXknXTtcbiAgQElucHV0KCkgYXV0b3BsYXk6IFN3aXBlck9wdGlvbnNbJ2F1dG9wbGF5J107XG4gIEBJbnB1dCgpIGNvbnRyb2xsZXI6IFN3aXBlck9wdGlvbnNbJ2NvbnRyb2xsZXInXTtcbiAgQElucHV0KCkgY292ZXJmbG93RWZmZWN0OiBTd2lwZXJPcHRpb25zWydjb3ZlcmZsb3dFZmZlY3QnXTtcbiAgQElucHV0KCkgY3ViZUVmZmVjdDogU3dpcGVyT3B0aW9uc1snY3ViZUVmZmVjdCddO1xuICBASW5wdXQoKSBmYWRlRWZmZWN0OiBTd2lwZXJPcHRpb25zWydmYWRlRWZmZWN0J107XG4gIEBJbnB1dCgpIGZsaXBFZmZlY3Q6IFN3aXBlck9wdGlvbnNbJ2ZsaXBFZmZlY3QnXTtcbiAgQElucHV0KCkgY3JlYXRpdmVFZmZlY3Q6IFN3aXBlck9wdGlvbnNbJ2NyZWF0aXZlRWZmZWN0J107XG4gIEBJbnB1dCgpIGNhcmRzRWZmZWN0OiBTd2lwZXJPcHRpb25zWydjYXJkc0VmZmVjdCddO1xuICBASW5wdXQoKSBoYXNoTmF2aWdhdGlvbjogU3dpcGVyT3B0aW9uc1snaGFzaE5hdmlnYXRpb24nXTtcbiAgQElucHV0KCkgaGlzdG9yeTogU3dpcGVyT3B0aW9uc1snaGlzdG9yeSddO1xuICBASW5wdXQoKSBrZXlib2FyZDogU3dpcGVyT3B0aW9uc1sna2V5Ym9hcmQnXTtcbiAgQElucHV0KCkgbGF6eTogU3dpcGVyT3B0aW9uc1snbGF6eSddO1xuICBASW5wdXQoKSBtb3VzZXdoZWVsOiBTd2lwZXJPcHRpb25zWydtb3VzZXdoZWVsJ107XG4gIEBJbnB1dCgpIHBhcmFsbGF4OiBTd2lwZXJPcHRpb25zWydwYXJhbGxheCddO1xuICBASW5wdXQoKSB0aHVtYnM6IFN3aXBlck9wdGlvbnNbJ3RodW1icyddO1xuICBASW5wdXQoKSB6b29tOiBTd2lwZXJPcHRpb25zWyd6b29tJ107XG4gIEBJbnB1dCgpIHNsaWRlc1Blckdyb3VwQXV0bzogU3dpcGVyT3B0aW9uc1snc2xpZGVzUGVyR3JvdXBBdXRvJ107XG4gIEBJbnB1dCgpIGNsYXNzOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG4gIEBJbnB1dCgpXG4gIHNldCBuYXZpZ2F0aW9uKHZhbCkge1xuICAgIGNvbnN0IGN1cnJlbnROZXh0ID1cbiAgICAgIHR5cGVvZiB0aGlzLl9uYXZpZ2F0aW9uICE9PSAnYm9vbGVhbicgJiYgdGhpcy5fbmF2aWdhdGlvbiAhPT0gJydcbiAgICAgICAgPyB0aGlzLl9uYXZpZ2F0aW9uPy5uZXh0RWxcbiAgICAgICAgOiBudWxsO1xuICAgIGNvbnN0IGN1cnJlbnRQcmV2ID1cbiAgICAgIHR5cGVvZiB0aGlzLl9uYXZpZ2F0aW9uICE9PSAnYm9vbGVhbicgJiYgdGhpcy5fbmF2aWdhdGlvbiAhPT0gJydcbiAgICAgICAgPyB0aGlzLl9uYXZpZ2F0aW9uPy5wcmV2RWxcbiAgICAgICAgOiBudWxsO1xuICAgIHRoaXMuX25hdmlnYXRpb24gPSBzZXRQcm9wZXJ0eSh2YWwsIHtcbiAgICAgIG5leHRFbDogY3VycmVudE5leHQgfHwgbnVsbCxcbiAgICAgIHByZXZFbDogY3VycmVudFByZXYgfHwgbnVsbCxcbiAgICB9KTtcbiAgICB0aGlzLnNob3dOYXZpZ2F0aW9uID0gIShcbiAgICAgIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWwpICE9PSB0cnVlIHx8XG4gICAgICAodGhpcy5fbmF2aWdhdGlvbiAmJlxuICAgICAgICB0eXBlb2YgdGhpcy5fbmF2aWdhdGlvbiAhPT0gJ2Jvb2xlYW4nICYmXG4gICAgICAgIHRoaXMuX25hdmlnYXRpb24ucHJldkVsICE9PSB0aGlzLl9wcmV2RWxSZWY/Lm5hdGl2ZUVsZW1lbnQgJiZcbiAgICAgICAgKHRoaXMuX25hdmlnYXRpb24ucHJldkVsICE9PSBudWxsIHx8IHRoaXMuX25hdmlnYXRpb24ubmV4dEVsICE9PSBudWxsKSAmJlxuICAgICAgICAodHlwZW9mIHRoaXMuX25hdmlnYXRpb24ubmV4dEVsID09PSAnc3RyaW5nJyB8fFxuICAgICAgICAgIHR5cGVvZiB0aGlzLl9uYXZpZ2F0aW9uLnByZXZFbCA9PT0gJ3N0cmluZycgfHxcbiAgICAgICAgICB0eXBlb2YgdGhpcy5fbmF2aWdhdGlvbi5uZXh0RWwgPT09ICdvYmplY3QnIHx8XG4gICAgICAgICAgdHlwZW9mIHRoaXMuX25hdmlnYXRpb24ucHJldkVsID09PSAnb2JqZWN0JykpXG4gICAgKTtcbiAgfVxuICBnZXQgbmF2aWdhdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fbmF2aWdhdGlvbjtcbiAgfVxuICBwcml2YXRlIF9uYXZpZ2F0aW9uOiBOYXZpZ2F0aW9uT3B0aW9ucyB8IGJvb2xlYW4gfCAnJztcbiAgc2hvd05hdmlnYXRpb246IGJvb2xlYW4gPSB0cnVlO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBwYWdpbmF0aW9uKHZhbCkge1xuICAgIGNvbnN0IGN1cnJlbnQgPVxuICAgICAgdHlwZW9mIHRoaXMuX3BhZ2luYXRpb24gIT09ICdib29sZWFuJyAmJiB0aGlzLl9wYWdpbmF0aW9uICE9PSAnJ1xuICAgICAgICA/IHRoaXMuX3BhZ2luYXRpb24/LmVsXG4gICAgICAgIDogbnVsbDtcbiAgICB0aGlzLl9wYWdpbmF0aW9uID0gc2V0UHJvcGVydHkodmFsLCB7XG4gICAgICBlbDogY3VycmVudCB8fCBudWxsLFxuICAgIH0pO1xuICAgIHRoaXMuc2hvd1BhZ2luYXRpb24gPSBpc1Nob3dFbCh2YWwsIHRoaXMuX3BhZ2luYXRpb24sIHRoaXMuX3BhZ2luYXRpb25FbFJlZik7XG4gIH1cbiAgZ2V0IHBhZ2luYXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3BhZ2luYXRpb247XG4gIH1cbiAgcHJpdmF0ZSBfcGFnaW5hdGlvbjogUGFnaW5hdGlvbk9wdGlvbnMgfCBib29sZWFuIHwgJyc7XG4gIHNob3dQYWdpbmF0aW9uOiBib29sZWFuID0gdHJ1ZTtcblxuICBASW5wdXQoKVxuICBzZXQgc2Nyb2xsYmFyKHZhbCkge1xuICAgIGNvbnN0IGN1cnJlbnQgPVxuICAgICAgdHlwZW9mIHRoaXMuX3Njcm9sbGJhciAhPT0gJ2Jvb2xlYW4nICYmIHRoaXMuX3Njcm9sbGJhciAhPT0gJycgPyB0aGlzLl9zY3JvbGxiYXI/LmVsIDogbnVsbDtcbiAgICB0aGlzLl9zY3JvbGxiYXIgPSBzZXRQcm9wZXJ0eSh2YWwsIHtcbiAgICAgIGVsOiBjdXJyZW50IHx8IG51bGwsXG4gICAgfSk7XG4gICAgdGhpcy5zaG93U2Nyb2xsYmFyID0gaXNTaG93RWwodmFsLCB0aGlzLl9zY3JvbGxiYXIsIHRoaXMuX3Njcm9sbGJhckVsUmVmKTtcbiAgfVxuICBnZXQgc2Nyb2xsYmFyKCkge1xuICAgIHJldHVybiB0aGlzLl9zY3JvbGxiYXI7XG4gIH1cbiAgcHJpdmF0ZSBfc2Nyb2xsYmFyOiBTY3JvbGxiYXJPcHRpb25zIHwgYm9vbGVhbiB8ICcnO1xuICBzaG93U2Nyb2xsYmFyOiBib29sZWFuID0gdHJ1ZTtcblxuICBASW5wdXQoKVxuICBzZXQgdmlydHVhbCh2YWwpIHtcbiAgICB0aGlzLl92aXJ0dWFsID0gc2V0UHJvcGVydHkodmFsKTtcbiAgfVxuICBnZXQgdmlydHVhbCgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmlydHVhbDtcbiAgfVxuICBwcml2YXRlIF92aXJ0dWFsOiBWaXJ0dWFsT3B0aW9ucyB8IGJvb2xlYW4gfCAnJztcblxuICBASW5wdXQoKVxuICBzZXQgY29uZmlnKHZhbDogU3dpcGVyT3B0aW9ucykge1xuICAgIHRoaXMudXBkYXRlU3dpcGVyKHZhbCk7XG4gICAgY29uc3QgeyBwYXJhbXMgfSA9IGdldFBhcmFtcyh2YWwpO1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgcGFyYW1zKTtcbiAgfVxuICBAT3V0cHV0KCdfYmVmb3JlQnJlYWtwb2ludCcpIHNfX2JlZm9yZUJyZWFrcG9pbnQgPSBuZXcgRXZlbnRFbWl0dGVyPFxuICAgIEV2ZW50c1BhcmFtc1snX2JlZm9yZUJyZWFrcG9pbnQnXVxuICA+KCk7XG5cbiAgQE91dHB1dCgnX2NvbnRhaW5lckNsYXNzZXMnKSBzX19jb250YWluZXJDbGFzc2VzID0gbmV3IEV2ZW50RW1pdHRlcjxcbiAgICBFdmVudHNQYXJhbXNbJ19jb250YWluZXJDbGFzc2VzJ11cbiAgPigpO1xuXG4gIEBPdXRwdXQoJ19zbGlkZUNsYXNzJykgc19fc2xpZGVDbGFzcyA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzUGFyYW1zWydfc2xpZGVDbGFzcyddPigpO1xuXG4gIEBPdXRwdXQoJ19zd2lwZXInKSBzX19zd2lwZXIgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50c1BhcmFtc1snX3N3aXBlciddPigpO1xuXG4gIEBPdXRwdXQoJ2FjdGl2ZUluZGV4Q2hhbmdlJykgc19hY3RpdmVJbmRleENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgRXZlbnRzUGFyYW1zWydhY3RpdmVJbmRleENoYW5nZSddXG4gID4oKTtcblxuICBAT3V0cHV0KCdhZnRlckluaXQnKSBzX2FmdGVySW5pdCA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzUGFyYW1zWydhZnRlckluaXQnXT4oKTtcblxuICBAT3V0cHV0KCdhdXRvcGxheScpIHNfYXV0b3BsYXkgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50c1BhcmFtc1snYXV0b3BsYXknXT4oKTtcblxuICBAT3V0cHV0KCdhdXRvcGxheVN0YXJ0Jykgc19hdXRvcGxheVN0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHNQYXJhbXNbJ2F1dG9wbGF5U3RhcnQnXT4oKTtcblxuICBAT3V0cHV0KCdhdXRvcGxheVN0b3AnKSBzX2F1dG9wbGF5U3RvcCA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzUGFyYW1zWydhdXRvcGxheVN0b3AnXT4oKTtcblxuICBAT3V0cHV0KCdhdXRvcGxheVBhdXNlJykgc19hdXRvcGxheVBhdXNlID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHNQYXJhbXNbJ2F1dG9wbGF5UGF1c2UnXT4oKTtcblxuICBAT3V0cHV0KCdhdXRvcGxheVJlc3VtZScpIHNfYXV0b3BsYXlSZXN1bWUgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50c1BhcmFtc1snYXV0b3BsYXlSZXN1bWUnXT4oKTtcblxuICBAT3V0cHV0KCdiZWZvcmVEZXN0cm95Jykgc19iZWZvcmVEZXN0cm95ID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHNQYXJhbXNbJ2JlZm9yZURlc3Ryb3knXT4oKTtcblxuICBAT3V0cHV0KCdiZWZvcmVJbml0Jykgc19iZWZvcmVJbml0ID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHNQYXJhbXNbJ2JlZm9yZUluaXQnXT4oKTtcblxuICBAT3V0cHV0KCdiZWZvcmVMb29wRml4Jykgc19iZWZvcmVMb29wRml4ID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHNQYXJhbXNbJ2JlZm9yZUxvb3BGaXgnXT4oKTtcblxuICBAT3V0cHV0KCdiZWZvcmVSZXNpemUnKSBzX2JlZm9yZVJlc2l6ZSA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzUGFyYW1zWydiZWZvcmVSZXNpemUnXT4oKTtcblxuICBAT3V0cHV0KCdiZWZvcmVTbGlkZUNoYW5nZVN0YXJ0Jykgc19iZWZvcmVTbGlkZUNoYW5nZVN0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxcbiAgICBFdmVudHNQYXJhbXNbJ2JlZm9yZVNsaWRlQ2hhbmdlU3RhcnQnXVxuICA+KCk7XG5cbiAgQE91dHB1dCgnYmVmb3JlVHJhbnNpdGlvblN0YXJ0Jykgc19iZWZvcmVUcmFuc2l0aW9uU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPFxuICAgIEV2ZW50c1BhcmFtc1snYmVmb3JlVHJhbnNpdGlvblN0YXJ0J11cbiAgPigpO1xuXG4gIEBPdXRwdXQoJ2JyZWFrcG9pbnQnKSBzX2JyZWFrcG9pbnQgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50c1BhcmFtc1snYnJlYWtwb2ludCddPigpO1xuXG4gIEBPdXRwdXQoJ2NoYW5nZURpcmVjdGlvbicpIHNfY2hhbmdlRGlyZWN0aW9uID0gbmV3IEV2ZW50RW1pdHRlcjxcbiAgICBFdmVudHNQYXJhbXNbJ2NoYW5nZURpcmVjdGlvbiddXG4gID4oKTtcblxuICBAT3V0cHV0KCdjbGljaycpIHNfY2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50c1BhcmFtc1snY2xpY2snXT4oKTtcblxuICBAT3V0cHV0KCdkb3VibGVUYXAnKSBzX2RvdWJsZVRhcCA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzUGFyYW1zWydkb3VibGVUYXAnXT4oKTtcblxuICBAT3V0cHV0KCdkb3VibGVDbGljaycpIHNfZG91YmxlQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50c1BhcmFtc1snZG91YmxlQ2xpY2snXT4oKTtcblxuICBAT3V0cHV0KCdkZXN0cm95Jykgc19kZXN0cm95ID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHNQYXJhbXNbJ2Rlc3Ryb3knXT4oKTtcblxuICBAT3V0cHV0KCdmcm9tRWRnZScpIHNfZnJvbUVkZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50c1BhcmFtc1snZnJvbUVkZ2UnXT4oKTtcblxuICBAT3V0cHV0KCdoYXNoQ2hhbmdlJykgc19oYXNoQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHNQYXJhbXNbJ2hhc2hDaGFuZ2UnXT4oKTtcblxuICBAT3V0cHV0KCdoYXNoU2V0Jykgc19oYXNoU2V0ID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHNQYXJhbXNbJ2hhc2hTZXQnXT4oKTtcblxuICBAT3V0cHV0KCdpbWFnZXNSZWFkeScpIHNfaW1hZ2VzUmVhZHkgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50c1BhcmFtc1snaW1hZ2VzUmVhZHknXT4oKTtcblxuICBAT3V0cHV0KCdpbml0Jykgc19pbml0ID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHNQYXJhbXNbJ2luaXQnXT4oKTtcblxuICBAT3V0cHV0KCdrZXlQcmVzcycpIHNfa2V5UHJlc3MgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50c1BhcmFtc1sna2V5UHJlc3MnXT4oKTtcblxuICBAT3V0cHV0KCdsYXp5SW1hZ2VMb2FkJykgc19sYXp5SW1hZ2VMb2FkID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHNQYXJhbXNbJ2xhenlJbWFnZUxvYWQnXT4oKTtcblxuICBAT3V0cHV0KCdsYXp5SW1hZ2VSZWFkeScpIHNfbGF6eUltYWdlUmVhZHkgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50c1BhcmFtc1snbGF6eUltYWdlUmVhZHknXT4oKTtcblxuICBAT3V0cHV0KCdsb29wRml4Jykgc19sb29wRml4ID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHNQYXJhbXNbJ2xvb3BGaXgnXT4oKTtcblxuICBAT3V0cHV0KCdtb21lbnR1bUJvdW5jZScpIHNfbW9tZW50dW1Cb3VuY2UgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50c1BhcmFtc1snbW9tZW50dW1Cb3VuY2UnXT4oKTtcblxuICBAT3V0cHV0KCduYXZpZ2F0aW9uSGlkZScpIHNfbmF2aWdhdGlvbkhpZGUgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50c1BhcmFtc1snbmF2aWdhdGlvbkhpZGUnXT4oKTtcblxuICBAT3V0cHV0KCduYXZpZ2F0aW9uU2hvdycpIHNfbmF2aWdhdGlvblNob3cgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50c1BhcmFtc1snbmF2aWdhdGlvblNob3cnXT4oKTtcblxuICBAT3V0cHV0KCduYXZpZ2F0aW9uUHJldicpIHNfbmF2aWdhdGlvblByZXYgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50c1BhcmFtc1snbmF2aWdhdGlvblByZXYnXT4oKTtcblxuICBAT3V0cHV0KCduYXZpZ2F0aW9uTmV4dCcpIHNfbmF2aWdhdGlvbk5leHQgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50c1BhcmFtc1snbmF2aWdhdGlvbk5leHQnXT4oKTtcblxuICBAT3V0cHV0KCdvYnNlcnZlclVwZGF0ZScpIHNfb2JzZXJ2ZXJVcGRhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50c1BhcmFtc1snb2JzZXJ2ZXJVcGRhdGUnXT4oKTtcblxuICBAT3V0cHV0KCdvcmllbnRhdGlvbmNoYW5nZScpIHNfb3JpZW50YXRpb25jaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFxuICAgIEV2ZW50c1BhcmFtc1snb3JpZW50YXRpb25jaGFuZ2UnXVxuICA+KCk7XG5cbiAgQE91dHB1dCgncGFnaW5hdGlvbkhpZGUnKSBzX3BhZ2luYXRpb25IaWRlID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHNQYXJhbXNbJ3BhZ2luYXRpb25IaWRlJ10+KCk7XG5cbiAgQE91dHB1dCgncGFnaW5hdGlvblJlbmRlcicpIHNfcGFnaW5hdGlvblJlbmRlciA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgRXZlbnRzUGFyYW1zWydwYWdpbmF0aW9uUmVuZGVyJ11cbiAgPigpO1xuXG4gIEBPdXRwdXQoJ3BhZ2luYXRpb25TaG93Jykgc19wYWdpbmF0aW9uU2hvdyA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzUGFyYW1zWydwYWdpbmF0aW9uU2hvdyddPigpO1xuXG4gIEBPdXRwdXQoJ3BhZ2luYXRpb25VcGRhdGUnKSBzX3BhZ2luYXRpb25VcGRhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPFxuICAgIEV2ZW50c1BhcmFtc1sncGFnaW5hdGlvblVwZGF0ZSddXG4gID4oKTtcblxuICBAT3V0cHV0KCdwcm9ncmVzcycpIHNfcHJvZ3Jlc3MgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50c1BhcmFtc1sncHJvZ3Jlc3MnXT4oKTtcblxuICBAT3V0cHV0KCdyZWFjaEJlZ2lubmluZycpIHNfcmVhY2hCZWdpbm5pbmcgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50c1BhcmFtc1sncmVhY2hCZWdpbm5pbmcnXT4oKTtcblxuICBAT3V0cHV0KCdyZWFjaEVuZCcpIHNfcmVhY2hFbmQgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50c1BhcmFtc1sncmVhY2hFbmQnXT4oKTtcblxuICBAT3V0cHV0KCdyZWFsSW5kZXhDaGFuZ2UnKSBzX3JlYWxJbmRleENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgRXZlbnRzUGFyYW1zWydyZWFsSW5kZXhDaGFuZ2UnXVxuICA+KCk7XG5cbiAgQE91dHB1dCgncmVzaXplJykgc19yZXNpemUgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50c1BhcmFtc1sncmVzaXplJ10+KCk7XG5cbiAgQE91dHB1dCgnc2Nyb2xsJykgc19zY3JvbGwgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50c1BhcmFtc1snc2Nyb2xsJ10+KCk7XG5cbiAgQE91dHB1dCgnc2Nyb2xsYmFyRHJhZ0VuZCcpIHNfc2Nyb2xsYmFyRHJhZ0VuZCA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgRXZlbnRzUGFyYW1zWydzY3JvbGxiYXJEcmFnRW5kJ11cbiAgPigpO1xuXG4gIEBPdXRwdXQoJ3Njcm9sbGJhckRyYWdNb3ZlJykgc19zY3JvbGxiYXJEcmFnTW92ZSA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgRXZlbnRzUGFyYW1zWydzY3JvbGxiYXJEcmFnTW92ZSddXG4gID4oKTtcblxuICBAT3V0cHV0KCdzY3JvbGxiYXJEcmFnU3RhcnQnKSBzX3Njcm9sbGJhckRyYWdTdGFydCA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgRXZlbnRzUGFyYW1zWydzY3JvbGxiYXJEcmFnU3RhcnQnXVxuICA+KCk7XG5cbiAgQE91dHB1dCgnc2V0VHJhbnNpdGlvbicpIHNfc2V0VHJhbnNpdGlvbiA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzUGFyYW1zWydzZXRUcmFuc2l0aW9uJ10+KCk7XG5cbiAgQE91dHB1dCgnc2V0VHJhbnNsYXRlJykgc19zZXRUcmFuc2xhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50c1BhcmFtc1snc2V0VHJhbnNsYXRlJ10+KCk7XG5cbiAgQE91dHB1dCgnc2xpZGVDaGFuZ2UnKSBzX3NsaWRlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHNQYXJhbXNbJ3NsaWRlQ2hhbmdlJ10+KCk7XG5cbiAgQE91dHB1dCgnc2xpZGVDaGFuZ2VUcmFuc2l0aW9uRW5kJykgc19zbGlkZUNoYW5nZVRyYW5zaXRpb25FbmQgPSBuZXcgRXZlbnRFbWl0dGVyPFxuICAgIEV2ZW50c1BhcmFtc1snc2xpZGVDaGFuZ2VUcmFuc2l0aW9uRW5kJ11cbiAgPigpO1xuXG4gIEBPdXRwdXQoJ3NsaWRlQ2hhbmdlVHJhbnNpdGlvblN0YXJ0Jykgc19zbGlkZUNoYW5nZVRyYW5zaXRpb25TdGFydCA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgRXZlbnRzUGFyYW1zWydzbGlkZUNoYW5nZVRyYW5zaXRpb25TdGFydCddXG4gID4oKTtcblxuICBAT3V0cHV0KCdzbGlkZU5leHRUcmFuc2l0aW9uRW5kJykgc19zbGlkZU5leHRUcmFuc2l0aW9uRW5kID0gbmV3IEV2ZW50RW1pdHRlcjxcbiAgICBFdmVudHNQYXJhbXNbJ3NsaWRlTmV4dFRyYW5zaXRpb25FbmQnXVxuICA+KCk7XG5cbiAgQE91dHB1dCgnc2xpZGVOZXh0VHJhbnNpdGlvblN0YXJ0Jykgc19zbGlkZU5leHRUcmFuc2l0aW9uU3RhcnQgPSBuZXcgRXZlbnRFbWl0dGVyPFxuICAgIEV2ZW50c1BhcmFtc1snc2xpZGVOZXh0VHJhbnNpdGlvblN0YXJ0J11cbiAgPigpO1xuXG4gIEBPdXRwdXQoJ3NsaWRlUHJldlRyYW5zaXRpb25FbmQnKSBzX3NsaWRlUHJldlRyYW5zaXRpb25FbmQgPSBuZXcgRXZlbnRFbWl0dGVyPFxuICAgIEV2ZW50c1BhcmFtc1snc2xpZGVQcmV2VHJhbnNpdGlvbkVuZCddXG4gID4oKTtcblxuICBAT3V0cHV0KCdzbGlkZVByZXZUcmFuc2l0aW9uU3RhcnQnKSBzX3NsaWRlUHJldlRyYW5zaXRpb25TdGFydCA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgRXZlbnRzUGFyYW1zWydzbGlkZVByZXZUcmFuc2l0aW9uU3RhcnQnXVxuICA+KCk7XG5cbiAgQE91dHB1dCgnc2xpZGVSZXNldFRyYW5zaXRpb25TdGFydCcpIHNfc2xpZGVSZXNldFRyYW5zaXRpb25TdGFydCA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgRXZlbnRzUGFyYW1zWydzbGlkZVJlc2V0VHJhbnNpdGlvblN0YXJ0J11cbiAgPigpO1xuXG4gIEBPdXRwdXQoJ3NsaWRlUmVzZXRUcmFuc2l0aW9uRW5kJykgc19zbGlkZVJlc2V0VHJhbnNpdGlvbkVuZCA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgRXZlbnRzUGFyYW1zWydzbGlkZVJlc2V0VHJhbnNpdGlvbkVuZCddXG4gID4oKTtcblxuICBAT3V0cHV0KCdzbGlkZXJNb3ZlJykgc19zbGlkZXJNb3ZlID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHNQYXJhbXNbJ3NsaWRlck1vdmUnXT4oKTtcblxuICBAT3V0cHV0KCdzbGlkZXJGaXJzdE1vdmUnKSBzX3NsaWRlckZpcnN0TW92ZSA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgRXZlbnRzUGFyYW1zWydzbGlkZXJGaXJzdE1vdmUnXVxuICA+KCk7XG5cbiAgQE91dHB1dCgnc2xpZGVzTGVuZ3RoQ2hhbmdlJykgc19zbGlkZXNMZW5ndGhDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFxuICAgIEV2ZW50c1BhcmFtc1snc2xpZGVzTGVuZ3RoQ2hhbmdlJ11cbiAgPigpO1xuXG4gIEBPdXRwdXQoJ3NsaWRlc0dyaWRMZW5ndGhDaGFuZ2UnKSBzX3NsaWRlc0dyaWRMZW5ndGhDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFxuICAgIEV2ZW50c1BhcmFtc1snc2xpZGVzR3JpZExlbmd0aENoYW5nZSddXG4gID4oKTtcblxuICBAT3V0cHV0KCdzbmFwR3JpZExlbmd0aENoYW5nZScpIHNfc25hcEdyaWRMZW5ndGhDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFxuICAgIEV2ZW50c1BhcmFtc1snc25hcEdyaWRMZW5ndGhDaGFuZ2UnXVxuICA+KCk7XG5cbiAgQE91dHB1dCgnc25hcEluZGV4Q2hhbmdlJykgc19zbmFwSW5kZXhDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFxuICAgIEV2ZW50c1BhcmFtc1snc25hcEluZGV4Q2hhbmdlJ11cbiAgPigpO1xuXG4gIEBPdXRwdXQoJ3RhcCcpIHNfdGFwID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHNQYXJhbXNbJ3RhcCddPigpO1xuXG4gIEBPdXRwdXQoJ3RvRWRnZScpIHNfdG9FZGdlID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHNQYXJhbXNbJ3RvRWRnZSddPigpO1xuXG4gIEBPdXRwdXQoJ3RvdWNoRW5kJykgc190b3VjaEVuZCA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzUGFyYW1zWyd0b3VjaEVuZCddPigpO1xuXG4gIEBPdXRwdXQoJ3RvdWNoTW92ZScpIHNfdG91Y2hNb3ZlID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHNQYXJhbXNbJ3RvdWNoTW92ZSddPigpO1xuXG4gIEBPdXRwdXQoJ3RvdWNoTW92ZU9wcG9zaXRlJykgc190b3VjaE1vdmVPcHBvc2l0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgRXZlbnRzUGFyYW1zWyd0b3VjaE1vdmVPcHBvc2l0ZSddXG4gID4oKTtcblxuICBAT3V0cHV0KCd0b3VjaFN0YXJ0Jykgc190b3VjaFN0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHNQYXJhbXNbJ3RvdWNoU3RhcnQnXT4oKTtcblxuICBAT3V0cHV0KCd0cmFuc2l0aW9uRW5kJykgc190cmFuc2l0aW9uRW5kID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHNQYXJhbXNbJ3RyYW5zaXRpb25FbmQnXT4oKTtcblxuICBAT3V0cHV0KCd0cmFuc2l0aW9uU3RhcnQnKSBzX3RyYW5zaXRpb25TdGFydCA9IG5ldyBFdmVudEVtaXR0ZXI8XG4gICAgRXZlbnRzUGFyYW1zWyd0cmFuc2l0aW9uU3RhcnQnXVxuICA+KCk7XG5cbiAgQE91dHB1dCgndXBkYXRlJykgc191cGRhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50c1BhcmFtc1sndXBkYXRlJ10+KCk7XG5cbiAgQE91dHB1dCgnem9vbUNoYW5nZScpIHNfem9vbUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzUGFyYW1zWyd6b29tQ2hhbmdlJ10+KCk7XG5cbiAgQE91dHB1dCgnc3dpcGVyJykgc19zd2lwZXIgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCdsb2NrJykgc19sb2NrID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHNQYXJhbXNbJ2xvY2snXT4oKTtcblxuICBAT3V0cHV0KCd1bmxvY2snKSBzX3VubG9jayA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzUGFyYW1zWyd1bmxvY2snXT4oKTtcblxuICBAVmlld0NoaWxkKCdwcmV2RWxSZWYnLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgc2V0IHByZXZFbFJlZihlbDogRWxlbWVudFJlZikge1xuICAgIHRoaXMuX3ByZXZFbFJlZiA9IGVsO1xuICAgIHRoaXMuX3NldEVsZW1lbnQoZWwsIHRoaXMubmF2aWdhdGlvbiwgJ25hdmlnYXRpb24nLCAncHJldkVsJyk7XG4gIH1cbiAgX3ByZXZFbFJlZjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnbmV4dEVsUmVmJywgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIHNldCBuZXh0RWxSZWYoZWw6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLl9uZXh0RWxSZWYgPSBlbDtcbiAgICB0aGlzLl9zZXRFbGVtZW50KGVsLCB0aGlzLm5hdmlnYXRpb24sICduYXZpZ2F0aW9uJywgJ25leHRFbCcpO1xuICB9XG4gIF9uZXh0RWxSZWY6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ3Njcm9sbGJhckVsUmVmJywgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIHNldCBzY3JvbGxiYXJFbFJlZihlbDogRWxlbWVudFJlZikge1xuICAgIHRoaXMuX3Njcm9sbGJhckVsUmVmID0gZWw7XG4gICAgdGhpcy5fc2V0RWxlbWVudChlbCwgdGhpcy5zY3JvbGxiYXIsICdzY3JvbGxiYXInKTtcbiAgfVxuICBfc2Nyb2xsYmFyRWxSZWY6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ3BhZ2luYXRpb25FbFJlZicsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBzZXQgcGFnaW5hdGlvbkVsUmVmKGVsOiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5fcGFnaW5hdGlvbkVsUmVmID0gZWw7XG4gICAgdGhpcy5fc2V0RWxlbWVudChlbCwgdGhpcy5wYWdpbmF0aW9uLCAncGFnaW5hdGlvbicpO1xuICB9XG4gIF9wYWdpbmF0aW9uRWxSZWY6IEVsZW1lbnRSZWY7XG4gIEBDb250ZW50Q2hpbGRyZW4oU3dpcGVyU2xpZGVEaXJlY3RpdmUsIHsgZGVzY2VuZGFudHM6IGZhbHNlLCBlbWl0RGlzdGluY3RDaGFuZ2VzT25seTogdHJ1ZSB9KVxuICBzbGlkZXNFbDogUXVlcnlMaXN0PFN3aXBlclNsaWRlRGlyZWN0aXZlPjtcbiAgcHJpdmF0ZSBzbGlkZXM6IFN3aXBlclNsaWRlRGlyZWN0aXZlW107XG5cbiAgcHJlcGVuZFNsaWRlczogT2JzZXJ2YWJsZTxTd2lwZXJTbGlkZURpcmVjdGl2ZVtdPjtcbiAgYXBwZW5kU2xpZGVzOiBPYnNlcnZhYmxlPFN3aXBlclNsaWRlRGlyZWN0aXZlW10+O1xuXG4gIHN3aXBlclJlZjogU3dpcGVyO1xuICByZWFkb25seSBfYWN0aXZlU2xpZGVzID0gbmV3IFN1YmplY3Q8U3dpcGVyU2xpZGVEaXJlY3RpdmVbXT4oKTtcblxuICBnZXQgYWN0aXZlU2xpZGVzKCkge1xuICAgIGlmICh0aGlzLnZpcnR1YWwpIHtcbiAgICAgIHJldHVybiB0aGlzLl9hY3RpdmVTbGlkZXM7XG4gICAgfVxuICAgIHJldHVybiBvZih0aGlzLnNsaWRlcyk7XG4gIH1cblxuICBnZXQgem9vbUNvbnRhaW5lckNsYXNzKCkge1xuICAgIHJldHVybiB0aGlzLnpvb20gJiYgdHlwZW9mIHRoaXMuem9vbSAhPT0gJ2Jvb2xlYW4nXG4gICAgICA/IHRoaXMuem9vbS5jb250YWluZXJDbGFzc1xuICAgICAgOiAnc3dpcGVyLXpvb20tY29udGFpbmVyJztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKSBjb250YWluZXJDbGFzc2VzOiBzdHJpbmcgPSAnc3dpcGVyJztcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIF9wbGF0Zm9ybUlkOiBPYmplY3QsXG4gICkge31cblxuICBwcml2YXRlIF9zZXRFbGVtZW50KGVsOiBFbGVtZW50UmVmLCByZWY6IGFueSwgdXBkYXRlOiBzdHJpbmcsIGtleSA9ICdlbCcpIHtcbiAgICBpZiAoIXJlZiB8fCAhZWwpIHJldHVybjtcbiAgICBpZiAoZWwubmF0aXZlRWxlbWVudCkge1xuICAgICAgaWYgKHJlZltrZXldID09PSBlbC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHJlZltrZXldID0gZWwubmF0aXZlRWxlbWVudDtcbiAgICB9XG4gICAgY29uc3QgdXBkYXRlT2JqOiB7IFtrZXk6IHN0cmluZ106IGJvb2xlYW4gfSA9IHt9O1xuICAgIHVwZGF0ZU9ialt1cGRhdGVdID0gdHJ1ZTtcbiAgICB0aGlzLnVwZGF0ZUluaXRTd2lwZXIodXBkYXRlT2JqKTtcbiAgfVxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBjb25zdCB7IHBhcmFtcyB9ID0gZ2V0UGFyYW1zKHRoaXMpO1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgcGFyYW1zKTtcbiAgfVxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5jaGlsZHJlblNsaWRlc0luaXQoKTtcbiAgICB0aGlzLmluaXRTd2lwZXIoKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnNfc3dpcGVyLmVtaXQodGhpcy5zd2lwZXJSZWYpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBjaGlsZHJlblNsaWRlc0luaXQoKSB7XG4gICAgdGhpcy5zbGlkZXNDaGFuZ2VzKHRoaXMuc2xpZGVzRWwpO1xuICAgIHRoaXMuc2xpZGVzRWwuY2hhbmdlcy5zdWJzY3JpYmUodGhpcy5zbGlkZXNDaGFuZ2VzKTtcbiAgfVxuXG4gIHByaXZhdGUgc2xpZGVzQ2hhbmdlcyA9ICh2YWw6IFF1ZXJ5TGlzdDxTd2lwZXJTbGlkZURpcmVjdGl2ZT4pID0+IHtcbiAgICB0aGlzLnNsaWRlcyA9IHZhbC5tYXAoKHNsaWRlOiBTd2lwZXJTbGlkZURpcmVjdGl2ZSwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgc2xpZGUuc2xpZGVJbmRleCA9IGluZGV4O1xuICAgICAgc2xpZGUuY2xhc3NOYW1lcyA9IHRoaXMuc2xpZGVDbGFzcyB8fCAnJztcbiAgICAgIHJldHVybiBzbGlkZTtcbiAgICB9KTtcbiAgICBpZiAodGhpcy5sb29wICYmICF0aGlzLmxvb3BlZFNsaWRlcykge1xuICAgICAgdGhpcy5jYWxjTG9vcGVkU2xpZGVzKCk7XG4gICAgfVxuICAgIGlmICghdGhpcy52aXJ0dWFsKSB7XG4gICAgICBpZiAodGhpcy5sb29wZWRTbGlkZXMpIHtcbiAgICAgICAgdGhpcy5wcmVwZW5kU2xpZGVzID0gb2YodGhpcy5zbGlkZXMuc2xpY2UodGhpcy5zbGlkZXMubGVuZ3RoIC0gdGhpcy5sb29wZWRTbGlkZXMpKTtcbiAgICAgICAgdGhpcy5hcHBlbmRTbGlkZXMgPSBvZih0aGlzLnNsaWRlcy5zbGljZSgwLCB0aGlzLmxvb3BlZFNsaWRlcykpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5zd2lwZXJSZWYgJiYgdGhpcy5zd2lwZXJSZWYudmlydHVhbCkge1xuICAgICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgdGhpcy5zd2lwZXJSZWYudmlydHVhbC5zbGlkZXMgPSB0aGlzLnNsaWRlcztcbiAgICAgICAgdGhpcy5zd2lwZXJSZWYudmlydHVhbC51cGRhdGUodHJ1ZSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9O1xuXG4gIGdldCBpc1N3aXBlckFjdGl2ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5zd2lwZXJSZWYgJiYgIXRoaXMuc3dpcGVyUmVmLmRlc3Ryb3llZDtcbiAgfVxuXG4gIGluaXRTd2lwZXIoKSB7XG4gICAgY29uc3QgeyBwYXJhbXM6IHN3aXBlclBhcmFtcywgcGFzc2VkUGFyYW1zIH0gPSBnZXRQYXJhbXModGhpcyk7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBzd2lwZXJQYXJhbXMpO1xuICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBzd2lwZXJQYXJhbXMuaW5pdCA9IGZhbHNlO1xuICAgICAgaWYgKCFzd2lwZXJQYXJhbXMudmlydHVhbCkge1xuICAgICAgICBzd2lwZXJQYXJhbXMub2JzZXJ2ZXIgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBzd2lwZXJQYXJhbXMub25BbnkgPSAoZXZlbnROYW1lOiBrZXlvZiBTd2lwZXJDb21wb25lbnQsIC4uLmFyZ3M6IGFueVtdKSA9PiB7XG4gICAgICAgIGNvbnN0IGVtaXR0ZXIgPSB0aGlzWygnc18nICsgZXZlbnROYW1lKSBhcyBrZXlvZiBTd2lwZXJDb21wb25lbnRdIGFzIEV2ZW50RW1pdHRlcjxhbnk+O1xuICAgICAgICBpZiAoZW1pdHRlcikge1xuICAgICAgICAgIGVtaXR0ZXIuZW1pdChbLi4uYXJnc10pO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgY29uc3QgX3NsaWRlQ2xhc3NlczogU3dpcGVyRXZlbnRzWydfc2xpZGVDbGFzc2VzJ10gPSAoXywgdXBkYXRlZCkgPT4ge1xuICAgICAgICB1cGRhdGVkLmZvckVhY2goKHsgc2xpZGVFbCwgY2xhc3NOYW1lcyB9LCBpbmRleCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGRhdGFJbmRleCA9IHNsaWRlRWwuZ2V0QXR0cmlidXRlKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpO1xuICAgICAgICAgIGNvbnN0IHNsaWRlSW5kZXggPSBkYXRhSW5kZXggPyBwYXJzZUludChkYXRhSW5kZXgpIDogaW5kZXg7XG4gICAgICAgICAgaWYgKHRoaXMudmlydHVhbCkge1xuICAgICAgICAgICAgY29uc3QgdmlydHVhbFNsaWRlID0gdGhpcy5zbGlkZXMuZmluZCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gaXRlbS52aXJ0dWFsSW5kZXggJiYgaXRlbS52aXJ0dWFsSW5kZXggPT09IHNsaWRlSW5kZXg7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICh2aXJ0dWFsU2xpZGUpIHtcbiAgICAgICAgICAgICAgdmlydHVhbFNsaWRlLmNsYXNzTmFtZXMgPSBjbGFzc05hbWVzO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMuc2xpZGVzW3NsaWRlSW5kZXhdKSB7XG4gICAgICAgICAgICB0aGlzLnNsaWRlc1tzbGlkZUluZGV4XS5jbGFzc05hbWVzID0gY2xhc3NOYW1lcztcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9O1xuICAgICAgY29uc3QgX2NvbnRhaW5lckNsYXNzZXM6IFN3aXBlckV2ZW50c1snX2NvbnRhaW5lckNsYXNzZXMnXSA9IChfLCBjbGFzc2VzKSA9PiB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuY29udGFpbmVyQ2xhc3NlcyA9IGNsYXNzZXM7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICAgIE9iamVjdC5hc3NpZ24oc3dpcGVyUGFyYW1zLm9uLCB7XG4gICAgICAgIF9jb250YWluZXJDbGFzc2VzLFxuICAgICAgICBfc2xpZGVDbGFzc2VzLFxuICAgICAgfSk7XG4gICAgICBjb25zdCBzd2lwZXJSZWYgPSBuZXcgU3dpcGVyKHN3aXBlclBhcmFtcyk7XG4gICAgICBzd2lwZXJSZWYubG9vcENyZWF0ZSA9ICgpID0+IHt9O1xuICAgICAgc3dpcGVyUmVmLmxvb3BEZXN0cm95ID0gKCkgPT4ge307XG4gICAgICBpZiAoc3dpcGVyUGFyYW1zLmxvb3ApIHtcbiAgICAgICAgc3dpcGVyUmVmLmxvb3BlZFNsaWRlcyA9IHRoaXMubG9vcGVkU2xpZGVzO1xuICAgICAgfVxuICAgICAgY29uc3QgaXNWaXJ0dWFsRW5hYmxlZCA9IGlzRW5hYmxlZChzd2lwZXJSZWYucGFyYW1zLnZpcnR1YWwpO1xuICAgICAgaWYgKHN3aXBlclJlZi52aXJ0dWFsICYmIGlzVmlydHVhbEVuYWJsZWQpIHtcbiAgICAgICAgc3dpcGVyUmVmLnZpcnR1YWwuc2xpZGVzID0gdGhpcy5zbGlkZXM7XG4gICAgICAgIGNvbnN0IGV4dGVuZFdpdGggPSB7XG4gICAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICAgIHNsaWRlczogdGhpcy5zbGlkZXMsXG4gICAgICAgICAgcmVuZGVyRXh0ZXJuYWw6IHRoaXMudXBkYXRlVmlydHVhbFNsaWRlcyxcbiAgICAgICAgICByZW5kZXJFeHRlcm5hbFVwZGF0ZTogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICAgIGV4dGVuZChzd2lwZXJSZWYucGFyYW1zLnZpcnR1YWwsIGV4dGVuZFdpdGgpO1xuICAgICAgICBleHRlbmQoc3dpcGVyUmVmLm9yaWdpbmFsUGFyYW1zLnZpcnR1YWwsIGV4dGVuZFdpdGgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5fcGxhdGZvcm1JZCkpIHtcbiAgICAgICAgdGhpcy5zd2lwZXJSZWYgPSBzd2lwZXJSZWYuaW5pdCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIGNvbnN0IGlzVmlydHVhbEVuYWJsZWQgPSBpc0VuYWJsZWQodGhpcy5zd2lwZXJSZWYucGFyYW1zLnZpcnR1YWwpO1xuICAgICAgICBpZiAodGhpcy5zd2lwZXJSZWYudmlydHVhbCAmJiBpc1ZpcnR1YWxFbmFibGVkKSB7XG4gICAgICAgICAgdGhpcy5zd2lwZXJSZWYudmlydHVhbC51cGRhdGUodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc3R5bGU6IGFueSA9IG51bGw7XG4gIGN1cnJlbnRWaXJ0dWFsRGF0YTogYW55OyAvLyBUT0RPOiB0eXBlIHZpcnR1YWxEYXRhO1xuICBwcml2YXRlIHVwZGF0ZVZpcnR1YWxTbGlkZXMgPSAodmlydHVhbERhdGE6IGFueSkgPT4ge1xuICAgIC8vIFRPRE86IHR5cGUgdmlydHVhbERhdGFcbiAgICBpZiAoXG4gICAgICAhdGhpcy5zd2lwZXJSZWYgfHxcbiAgICAgICh0aGlzLmN1cnJlbnRWaXJ0dWFsRGF0YSAmJlxuICAgICAgICB0aGlzLmN1cnJlbnRWaXJ0dWFsRGF0YS5mcm9tID09PSB2aXJ0dWFsRGF0YS5mcm9tICYmXG4gICAgICAgIHRoaXMuY3VycmVudFZpcnR1YWxEYXRhLnRvID09PSB2aXJ0dWFsRGF0YS50byAmJlxuICAgICAgICB0aGlzLmN1cnJlbnRWaXJ0dWFsRGF0YS5vZmZzZXQgPT09IHZpcnR1YWxEYXRhLm9mZnNldClcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5zdHlsZSA9IHRoaXMuc3dpcGVyUmVmLmlzSG9yaXpvbnRhbCgpXG4gICAgICA/IHtcbiAgICAgICAgICBbdGhpcy5zd2lwZXJSZWYucnRsVHJhbnNsYXRlID8gJ3JpZ2h0JyA6ICdsZWZ0J106IGAke3ZpcnR1YWxEYXRhLm9mZnNldH1weGAsXG4gICAgICAgIH1cbiAgICAgIDoge1xuICAgICAgICAgIHRvcDogYCR7dmlydHVhbERhdGEub2Zmc2V0fXB4YCxcbiAgICAgICAgfTtcbiAgICB0aGlzLmN1cnJlbnRWaXJ0dWFsRGF0YSA9IHZpcnR1YWxEYXRhO1xuICAgIHRoaXMuX2FjdGl2ZVNsaWRlcy5uZXh0KHZpcnR1YWxEYXRhLnNsaWRlcyk7XG4gICAgdGhpcy5fbmdab25lLnJ1bigoKSA9PiB7XG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSk7XG4gICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMuc3dpcGVyUmVmLnVwZGF0ZVNsaWRlcygpO1xuICAgICAgdGhpcy5zd2lwZXJSZWYudXBkYXRlUHJvZ3Jlc3MoKTtcbiAgICAgIHRoaXMuc3dpcGVyUmVmLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcbiAgICAgIGlmIChpc0VuYWJsZWQodGhpcy5zd2lwZXJSZWYucGFyYW1zLmxhenkpKSB7XG4gICAgICAgIHRoaXMuc3dpcGVyUmVmLmxhenkubG9hZCgpO1xuICAgICAgfVxuICAgICAgdGhpcy5zd2lwZXJSZWYudmlydHVhbC51cGRhdGUodHJ1ZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuO1xuICB9O1xuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZWRQYXJhbXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICB0aGlzLnVwZGF0ZVN3aXBlcihjaGFuZ2VkUGFyYW1zKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICB1cGRhdGVJbml0U3dpcGVyKGNoYW5nZWRQYXJhbXM6IGFueSkge1xuICAgIGlmICghKGNoYW5nZWRQYXJhbXMgJiYgdGhpcy5zd2lwZXJSZWYgJiYgIXRoaXMuc3dpcGVyUmVmLmRlc3Ryb3llZCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgY29uc3Qge1xuICAgICAgICBwYXJhbXM6IGN1cnJlbnRQYXJhbXMsXG4gICAgICAgIHBhZ2luYXRpb24sXG4gICAgICAgIG5hdmlnYXRpb24sXG4gICAgICAgIHNjcm9sbGJhcixcbiAgICAgICAgdmlydHVhbCxcbiAgICAgICAgdGh1bWJzLFxuICAgICAgfSA9IHRoaXMuc3dpcGVyUmVmO1xuXG4gICAgICBpZiAoY2hhbmdlZFBhcmFtcy5wYWdpbmF0aW9uKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLnBhZ2luYXRpb24gJiZcbiAgICAgICAgICB0eXBlb2YgdGhpcy5wYWdpbmF0aW9uICE9PSAnYm9vbGVhbicgJiZcbiAgICAgICAgICB0aGlzLnBhZ2luYXRpb24uZWwgJiZcbiAgICAgICAgICBwYWdpbmF0aW9uICYmXG4gICAgICAgICAgIXBhZ2luYXRpb24uZWxcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVQYXJhbWV0ZXIoJ3BhZ2luYXRpb24nLCB0aGlzLnBhZ2luYXRpb24pO1xuICAgICAgICAgIHBhZ2luYXRpb24uaW5pdCgpO1xuICAgICAgICAgIHBhZ2luYXRpb24ucmVuZGVyKCk7XG4gICAgICAgICAgcGFnaW5hdGlvbi51cGRhdGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwYWdpbmF0aW9uLmRlc3Ryb3koKTtcbiAgICAgICAgICBwYWdpbmF0aW9uLmVsID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoY2hhbmdlZFBhcmFtcy5zY3JvbGxiYXIpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMuc2Nyb2xsYmFyICYmXG4gICAgICAgICAgdHlwZW9mIHRoaXMuc2Nyb2xsYmFyICE9PSAnYm9vbGVhbicgJiZcbiAgICAgICAgICB0aGlzLnNjcm9sbGJhci5lbCAmJlxuICAgICAgICAgIHNjcm9sbGJhciAmJlxuICAgICAgICAgICFzY3JvbGxiYXIuZWxcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVQYXJhbWV0ZXIoJ3Njcm9sbGJhcicsIHRoaXMuc2Nyb2xsYmFyKTtcbiAgICAgICAgICBzY3JvbGxiYXIuaW5pdCgpO1xuICAgICAgICAgIHNjcm9sbGJhci51cGRhdGVTaXplKCk7XG4gICAgICAgICAgc2Nyb2xsYmFyLnNldFRyYW5zbGF0ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNjcm9sbGJhci5kZXN0cm95KCk7XG4gICAgICAgICAgc2Nyb2xsYmFyLmVsID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoY2hhbmdlZFBhcmFtcy5uYXZpZ2F0aW9uKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLm5hdmlnYXRpb24gJiZcbiAgICAgICAgICB0eXBlb2YgdGhpcy5uYXZpZ2F0aW9uICE9PSAnYm9vbGVhbicgJiZcbiAgICAgICAgICB0aGlzLm5hdmlnYXRpb24ucHJldkVsICYmXG4gICAgICAgICAgdGhpcy5uYXZpZ2F0aW9uLm5leHRFbCAmJlxuICAgICAgICAgIG5hdmlnYXRpb24gJiZcbiAgICAgICAgICAhbmF2aWdhdGlvbi5wcmV2RWwgJiZcbiAgICAgICAgICAhbmF2aWdhdGlvbi5uZXh0RWxcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVQYXJhbWV0ZXIoJ25hdmlnYXRpb24nLCB0aGlzLm5hdmlnYXRpb24pO1xuICAgICAgICAgIG5hdmlnYXRpb24uaW5pdCgpO1xuICAgICAgICAgIG5hdmlnYXRpb24udXBkYXRlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAobmF2aWdhdGlvbi5wcmV2RWwgJiYgbmF2aWdhdGlvbi5uZXh0RWwpIHtcbiAgICAgICAgICBuYXZpZ2F0aW9uLmRlc3Ryb3koKTtcbiAgICAgICAgICBuYXZpZ2F0aW9uLm5leHRFbCA9IG51bGw7XG4gICAgICAgICAgbmF2aWdhdGlvbi5wcmV2RWwgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoY2hhbmdlZFBhcmFtcy50aHVtYnMgJiYgdGhpcy50aHVtYnMgJiYgdGhpcy50aHVtYnMuc3dpcGVyKSB7XG4gICAgICAgIHRoaXMudXBkYXRlUGFyYW1ldGVyKCd0aHVtYnMnLCB0aGlzLnRodW1icyk7XG4gICAgICAgIGNvbnN0IGluaXRpYWxpemVkID0gdGh1bWJzLmluaXQoKTtcbiAgICAgICAgaWYgKGluaXRpYWxpemVkKSB0aHVtYnMudXBkYXRlKHRydWUpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2hhbmdlZFBhcmFtcy5jb250cm9sbGVyICYmIHRoaXMuY29udHJvbGxlciAmJiB0aGlzLmNvbnRyb2xsZXIuY29udHJvbCkge1xuICAgICAgICB0aGlzLnN3aXBlclJlZi5jb250cm9sbGVyLmNvbnRyb2wgPSB0aGlzLmNvbnRyb2xsZXIuY29udHJvbDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zd2lwZXJSZWYudXBkYXRlKCk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVTd2lwZXIoY2hhbmdlZFBhcmFtczogU2ltcGxlQ2hhbmdlcyB8IGFueSkge1xuICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBpZiAoY2hhbmdlZFBhcmFtcy5jb25maWcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKCEoY2hhbmdlZFBhcmFtcyAmJiB0aGlzLnN3aXBlclJlZiAmJiAhdGhpcy5zd2lwZXJSZWYuZGVzdHJveWVkKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBjaGFuZ2VkUGFyYW1zKSB7XG4gICAgICAgIGlmIChpZ25vcmVOZ09uQ2hhbmdlcy5pbmRleE9mKGtleSkgPj0gMCkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gY2hhbmdlZFBhcmFtc1trZXldPy5jdXJyZW50VmFsdWUgPz8gY2hhbmdlZFBhcmFtc1trZXldO1xuICAgICAgICB0aGlzLnVwZGF0ZVBhcmFtZXRlcihrZXksIG5ld1ZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNoYW5nZWRQYXJhbXMuYWxsb3dTbGlkZU5leHQpIHtcbiAgICAgICAgdGhpcy5zd2lwZXJSZWYuYWxsb3dTbGlkZU5leHQgPSB0aGlzLmFsbG93U2xpZGVOZXh0O1xuICAgICAgfVxuICAgICAgaWYgKGNoYW5nZWRQYXJhbXMuYWxsb3dTbGlkZVByZXYpIHtcbiAgICAgICAgdGhpcy5zd2lwZXJSZWYuYWxsb3dTbGlkZVByZXYgPSB0aGlzLmFsbG93U2xpZGVQcmV2O1xuICAgICAgfVxuICAgICAgaWYgKGNoYW5nZWRQYXJhbXMuZGlyZWN0aW9uKSB7XG4gICAgICAgIHRoaXMuc3dpcGVyUmVmLmNoYW5nZURpcmVjdGlvbih0aGlzLmRpcmVjdGlvbiwgZmFsc2UpO1xuICAgICAgfVxuICAgICAgaWYgKGNoYW5nZWRQYXJhbXMuYnJlYWtwb2ludHMpIHtcbiAgICAgICAgaWYgKHRoaXMubG9vcCAmJiAhdGhpcy5sb29wZWRTbGlkZXMpIHtcbiAgICAgICAgICB0aGlzLmNhbGNMb29wZWRTbGlkZXMoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN3aXBlclJlZi5jdXJyZW50QnJlYWtwb2ludCA9IG51bGw7XG4gICAgICAgIHRoaXMuc3dpcGVyUmVmLnNldEJyZWFrcG9pbnQoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNoYW5nZWRQYXJhbXMudGh1bWJzIHx8IGNoYW5nZWRQYXJhbXMuY29udHJvbGxlcikge1xuICAgICAgICB0aGlzLnVwZGF0ZUluaXRTd2lwZXIoY2hhbmdlZFBhcmFtcyk7XG4gICAgICB9XG4gICAgICB0aGlzLnN3aXBlclJlZi51cGRhdGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNhbGNMb29wZWRTbGlkZXMoKSB7XG4gICAgaWYgKCF0aGlzLmxvb3ApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgbGV0IHNsaWRlc1BlclZpZXdQYXJhbXMgPSB0aGlzLnNsaWRlc1BlclZpZXc7XG4gICAgaWYgKHRoaXMuYnJlYWtwb2ludHMpIHtcbiAgICAgIGNvbnN0IGJyZWFrcG9pbnQgPSBTd2lwZXIucHJvdG90eXBlLmdldEJyZWFrcG9pbnQodGhpcy5icmVha3BvaW50cyk7XG4gICAgICBjb25zdCBicmVha3BvaW50T25seVBhcmFtcyA9XG4gICAgICAgIGJyZWFrcG9pbnQgaW4gdGhpcy5icmVha3BvaW50cyA/IHRoaXMuYnJlYWtwb2ludHNbYnJlYWtwb2ludF0gOiB1bmRlZmluZWQ7XG4gICAgICBpZiAoYnJlYWtwb2ludE9ubHlQYXJhbXMgJiYgYnJlYWtwb2ludE9ubHlQYXJhbXMuc2xpZGVzUGVyVmlldykge1xuICAgICAgICBzbGlkZXNQZXJWaWV3UGFyYW1zID0gYnJlYWtwb2ludE9ubHlQYXJhbXMuc2xpZGVzUGVyVmlldztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNsaWRlc1BlclZpZXdQYXJhbXMgPT09ICdhdXRvJykge1xuICAgICAgdGhpcy5sb29wZWRTbGlkZXMgPSB0aGlzLnNsaWRlcy5sZW5ndGg7XG4gICAgICByZXR1cm4gdGhpcy5zbGlkZXMubGVuZ3RoO1xuICAgIH1cbiAgICBsZXQgbG9vcGVkU2xpZGVzID0gdGhpcy5sb29wZWRTbGlkZXMgfHwgc2xpZGVzUGVyVmlld1BhcmFtcztcbiAgICBpZiAoIWxvb3BlZFNsaWRlcykge1xuICAgICAgLy8gP1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmxvb3BBZGRpdGlvbmFsU2xpZGVzKSB7XG4gICAgICBsb29wZWRTbGlkZXMgKz0gdGhpcy5sb29wQWRkaXRpb25hbFNsaWRlcztcbiAgICB9XG4gICAgaWYgKGxvb3BlZFNsaWRlcyA+IHRoaXMuc2xpZGVzLmxlbmd0aCkge1xuICAgICAgbG9vcGVkU2xpZGVzID0gdGhpcy5zbGlkZXMubGVuZ3RoO1xuICAgIH1cbiAgICB0aGlzLmxvb3BlZFNsaWRlcyA9IGxvb3BlZFNsaWRlcztcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHVwZGF0ZVBhcmFtZXRlcihrZXk6IHN0cmluZywgdmFsdWU6IGFueSkge1xuICAgIGlmICghKHRoaXMuc3dpcGVyUmVmICYmICF0aGlzLnN3aXBlclJlZi5kZXN0cm95ZWQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IF9rZXkgPSBrZXkucmVwbGFjZSgvXl8vLCAnJykgYXMga2V5b2YgU3dpcGVyT3B0aW9ucztcbiAgICBjb25zdCBpc0N1cnJlbnRQYXJhbU9iaiA9IGlzT2JqZWN0KHRoaXMuc3dpcGVyUmVmLnBhcmFtc1tfa2V5XSk7XG5cbiAgICBpZiAoX2tleSA9PT0gJ2VuYWJsZWQnKSB7XG4gICAgICBpZiAodmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5zd2lwZXJSZWYuZW5hYmxlKCk7XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICB0aGlzLnN3aXBlclJlZi5kaXNhYmxlKCk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChpc0N1cnJlbnRQYXJhbU9iaiAmJiBpc09iamVjdCh2YWx1ZSkpIHtcbiAgICAgIGV4dGVuZCh0aGlzLnN3aXBlclJlZi5wYXJhbXNbX2tleV0sIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgKHRoaXMuc3dpcGVyUmVmLnBhcmFtc1tfa2V5XSBhcyBhbnkpID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMuc3dpcGVyUmVmPy5kZXN0cm95KHRydWUsIGZhbHNlKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiPG5nLWNvbnRlbnQgc2VsZWN0PVwiW3Nsb3Q9Y29udGFpbmVyLXN0YXJ0XVwiPjwvbmctY29udGVudD5cbjxuZy1jb250YWluZXIgKm5nSWY9XCJuYXZpZ2F0aW9uICYmIHNob3dOYXZpZ2F0aW9uXCI+XG4gIDxkaXYgY2xhc3M9XCJzd2lwZXItYnV0dG9uLXByZXZcIiAjcHJldkVsUmVmPjwvZGl2PlxuICA8ZGl2IGNsYXNzPVwic3dpcGVyLWJ1dHRvbi1uZXh0XCIgI25leHRFbFJlZj48L2Rpdj5cbjwvbmctY29udGFpbmVyPlxuPGRpdiAqbmdJZj1cInNjcm9sbGJhciAmJiBzaG93U2Nyb2xsYmFyXCIgY2xhc3M9XCJzd2lwZXItc2Nyb2xsYmFyXCIgI3Njcm9sbGJhckVsUmVmPjwvZGl2PlxuPGRpdiAqbmdJZj1cInBhZ2luYXRpb24gJiYgc2hvd1BhZ2luYXRpb25cIiBjbGFzcz1cInN3aXBlci1wYWdpbmF0aW9uXCIgI3BhZ2luYXRpb25FbFJlZj48L2Rpdj5cbjxkaXYgW25nQ2xhc3NdPVwid3JhcHBlckNsYXNzXCIgW2F0dHIuaWRdPVwiaWRcIj5cbiAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW3Nsb3Q9d3JhcHBlci1zdGFydF1cIj48L25nLWNvbnRlbnQ+XG4gIDxuZy10ZW1wbGF0ZVxuICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwiXG4gICAgICBzbGlkZXNUZW1wbGF0ZTtcbiAgICAgIGNvbnRleHQ6IHtcbiAgICAgICAgbG9vcFNsaWRlczogcHJlcGVuZFNsaWRlcyxcbiAgICAgICAga2V5OiAncHJlcGVuZCdcbiAgICAgIH1cbiAgICBcIlxuICA+PC9uZy10ZW1wbGF0ZT5cbiAgPG5nLXRlbXBsYXRlXG4gICAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJcbiAgICAgIHNsaWRlc1RlbXBsYXRlO1xuICAgICAgY29udGV4dDoge1xuICAgICAgICBsb29wU2xpZGVzOiBhY3RpdmVTbGlkZXMsXG4gICAgICAgIGtleTogJydcbiAgICAgIH1cbiAgICBcIlxuICA+PC9uZy10ZW1wbGF0ZT5cbiAgPG5nLXRlbXBsYXRlXG4gICAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJcbiAgICAgIHNsaWRlc1RlbXBsYXRlO1xuICAgICAgY29udGV4dDoge1xuICAgICAgICBsb29wU2xpZGVzOiBhcHBlbmRTbGlkZXMsXG4gICAgICAgIGtleTogJ2FwcGVuZCdcbiAgICAgIH1cbiAgICBcIlxuICA+PC9uZy10ZW1wbGF0ZT5cbiAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW3Nsb3Q9d3JhcHBlci1lbmRdXCI+PC9uZy1jb250ZW50PlxuPC9kaXY+XG48bmctY29udGVudCBzZWxlY3Q9XCJbc2xvdD1jb250YWluZXItZW5kXVwiPjwvbmctY29udGVudD5cblxuPG5nLXRlbXBsYXRlICNzbGlkZXNUZW1wbGF0ZSBsZXQtbG9vcFNsaWRlcz1cImxvb3BTbGlkZXNcIiBsZXQtc2xpZGVLZXk9XCJrZXlcIj5cbiAgPGRpdlxuICAgICpuZ0Zvcj1cImxldCBzbGlkZSBvZiBsb29wU2xpZGVzIHwgYXN5bmNcIlxuICAgIFtuZ0NsYXNzXT1cIlxuICAgICAgKHNsaWRlLmNsYXNzID8gc2xpZGUuY2xhc3MgKyAnICcgOiAnJykgK1xuICAgICAgc2xpZGVDbGFzcyArXG4gICAgICAoc2xpZGVLZXkgIT09ICcnID8gJyAnICsgc2xpZGVEdXBsaWNhdGVDbGFzcyA6ICcnKVxuICAgIFwiXG4gICAgW2F0dHIuZGF0YS1zd2lwZXItc2xpZGUtaW5kZXhdPVwic2xpZGUudmlydHVhbEluZGV4ID8gc2xpZGUudmlydHVhbEluZGV4IDogc2xpZGUuc2xpZGVJbmRleFwiXG4gICAgW2F0dHIuZGF0YS1zd2lwZXItYXV0b3BsYXldPVwic2xpZGUuYXV0b3BsYXlEZWxheVwiXG4gICAgW3N0eWxlXT1cInN0eWxlXCJcbiAgICBbbmdTd2l0Y2hdPVwic2xpZGUuem9vbVwiXG4gID5cbiAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCJ0cnVlXCIgW25nQ2xhc3NdPVwiem9vbUNvbnRhaW5lckNsYXNzXCI+XG4gICAgICA8bmctdGVtcGxhdGVcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwic2xpZGUudGVtcGxhdGVcIlxuICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie1xuICAgICAgICAgICRpbXBsaWNpdDogc2xpZGUuc2xpZGVEYXRhXG4gICAgICAgIH1cIlxuICAgICAgPjwvbmctdGVtcGxhdGU+XG4gICAgPC9kaXY+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hEZWZhdWx0PlxuICAgICAgPG5nLXRlbXBsYXRlXG4gICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInNsaWRlLnRlbXBsYXRlXCJcbiAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntcbiAgICAgICAgICAkaW1wbGljaXQ6IHNsaWRlLnNsaWRlRGF0YVxuICAgICAgICB9XCJcbiAgICAgID48L25nLXRlbXBsYXRlPlxuICAgIDwvbmctY29udGFpbmVyPlxuICA8L2Rpdj5cbjwvbmctdGVtcGxhdGU+XG4iXX0=