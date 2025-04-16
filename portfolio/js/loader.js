/**
 * @fileoverview Resource Loader - Gère le chargement asynchrone des ressources du portfolio
 * @author Bilal EL AZZAM
 * @version 1.0.0
 */

/**
 * Classe gérant le chargement des ressources (scripts, styles, images)
 * @class ResourceLoader
 */
class ResourceLoader {
    /**
     * Initialise le gestionnaire de ressources
     * @constructor
     */
    constructor() {
        this.resources = {
            scripts: [],
            styles: [],
            images: []
        };
        this.loaded = false;
        this.initTime = Date.now();
    }

    /**
     * Ajoute un script à la liste de chargement
     * @param {string} src - URL du script
     * @param {boolean} [async=true] - Indique si le script doit être chargé de manière asynchrone
     */
    addScript(src, async = true) {
        this.resources.scripts.push({ src, async });
    }

    /**
     * Ajoute une feuille de style à la liste de chargement
     * @param {string} href - URL de la feuille de style
     */
    addStyle(href) {
        this.resources.styles.push(href);
    }

    /**
     * Ajoute une image à la liste de préchargement
     * @param {string} src - URL de l'image
     */
    addImage(src) {
        this.resources.images.push(src);
    }

    /**
     * Nettoie les ressources précédemment chargées
     * @private
     */
    clearCache() {
        // Suppression des scripts précédents
        const oldScripts = document.querySelectorAll('script[data-loader]');
        oldScripts.forEach(script => script.remove());

        // Suppression des styles précédents
        const oldStyles = document.querySelectorAll('link[data-loader]');
        oldStyles.forEach(style => style.remove());

        this.loaded = false;
    }

    /**
     * Charge toutes les ressources de manière asynchrone
     * @returns {Promise} Une promesse résolue lorsque toutes les ressources sont chargées
     */
    load() {
        this.clearCache();

        return new Promise((resolve, reject) => {
            const promises = [];

            // Chargement prioritaire des styles
            this.resources.styles.forEach(href => {
                promises.push(
                    new Promise((resolveStyle) => {
                        const link = document.createElement('link');
                        link.rel = 'stylesheet';
                        link.href = href + '?v=' + this.initTime;
                        link.setAttribute('data-loader', 'true');
                        link.onload = resolveStyle;
                        link.onerror = () => {
                            console.error(`[ResourceLoader] Erreur de chargement du style: ${href}`);
                            resolveStyle();
                        };
                        document.head.appendChild(link);
                    })
                );
            });

            // Séquence de chargement des ressources
            Promise.all(promises)
                .then(() => {
                    const scriptPromises = [];

                    // Chargement des scripts après les styles
                    this.resources.scripts.forEach(({ src, async }) => {
                        scriptPromises.push(
                            new Promise((resolveScript) => {
                                const script = document.createElement('script');
                                script.src = src + '?v=' + this.initTime;
                                script.async = async;
                                script.setAttribute('data-loader', 'true');
                                script.onload = resolveScript;
                                script.onerror = () => {
                                    console.error(`[ResourceLoader] Erreur de chargement du script: ${src}`);
                                    resolveScript();
                                };
                                document.head.appendChild(script);
                            })
                        );
                    });

                    return Promise.all(scriptPromises);
                })
                .then(() => {
                    // Préchargement des images en dernier
                    const imagePromises = this.resources.images.map(src => {
                        return new Promise((resolveImage) => {
                            const img = new Image();
                            img.src = src + '?v=' + this.initTime;
                            img.onload = resolveImage;
                            img.onerror = () => {
                                console.error(`[ResourceLoader] Erreur de chargement de l'image: ${src}`);
                                resolveImage();
                            };
                        });
                    });

                    return Promise.all(imagePromises);
                })
                .then(() => {
                    this.loaded = true;
                    console.log('[ResourceLoader] Chargement des ressources terminé');
                    resolve();
                })
                .catch(error => {
                    console.error('[ResourceLoader] Erreur critique:', error);
                    reject(error);
                });
        });
    }
}

// Initialisation du chargeur de ressources
const loader = new ResourceLoader();

// Configuration des ressources externes
loader.addScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js');
loader.addScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js');
loader.addScript('https://unpkg.com/aos@next/dist/aos.js');
loader.addStyle('https://unpkg.com/aos@next/dist/aos.css');

/**
 * Initialisation de l'application
 * Attend le chargement complet du DOM avant d'initialiser les modules
 */
document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('load', () => {
        loader.load()
            .then(() => {
                console.log('[App] Initialisation des modules...');
                
                // Séquence d'initialisation des modules
                if (window.initAnimations) {
                    try {
                        window.initAnimations();
                        console.log('[App] Animations initialisées');
                    } catch (e) {
                        console.error('[App] Erreur d\'initialisation des animations:', e);
                    }
                }

                if (window.initProjects) {
                    try {
                        window.initProjects();
                        console.log('[App] Projets initialisés');
                    } catch (e) {
                        console.error('[App] Erreur d\'initialisation des projets:', e);
                    }
                }

                if (window.initSkills) {
                    try {
                        window.initSkills();
                        console.log('[App] Compétences initialisées');
                    } catch (e) {
                        console.error('[App] Erreur d\'initialisation des compétences:', e);
                    }
                }
            })
            .catch(error => {
                console.error('[App] Erreur critique d\'initialisation:', error);
            });
    });
}); 