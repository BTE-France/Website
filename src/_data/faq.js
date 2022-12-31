module.exports = [
  {
    question: {
      fr: "Comment puis-je rejoindre le serveur Minecraft ?",
      en: "How can I join the Minecraft server ?"
    },
    answer: {
      fr: "L'adresse IP du serveur est `btefrance.fr`. " +
        "Vous pouvez vous connecter avec Minecraft vanilla 1.12.2, " +
        "mais nous vous recommandons fortement d'installer notre modpack pour bénéficier de la meilleur " +
        "expérience possible. " +
        "**Vous devez également posséder une copie légitime de Minecraft pour jouer**, " +
        "les versions dites 'crackées' ne sont pas tolérées sur le serveur." +
        "\n\n" +
        "Pour les détails, le salon Discord <#694003889506091100/810512822928670780,comment-rejoindre> sert de référence en la matière.",
      en: "The server's IP is `btefrance.fr`. " +
        "You can join with vanilla 1.12.2 Minecraft, " +
        "but we highly encourage you to install the Build The Earth modpack to get the full experience." +
        "**Illegitimate copies of Minecraft are not allowed**, you must own a proper Minecraft account to join our server." +
        "\n\n" +
        "For more details, the <#694003889506091100/735892858128695367,how-to-join> has all the information you need."
    }
  },
  {
    question: {
      fr: "Puis-je rejoindre le serveur avec Minecraft Bedrock ?",
      en: "Can I join with bedrock edition ?"
    },
    answer: {
      fr: "Non." +
        "\n\n" +
        "Les versions bedrock ont été supportées par le passé, " +
        "mais accueillir des joueurs jouant au dernières versions Bedrock sur un serveur Java 1.12.2 moddé " +
        "nécessite de nombreuses couches de compatibilité complexe et demande des ressources humaines dont nous ne disposons pas.",
      en: "No." +
        "\n\n" +
        "Bedrock players were able to join in the past, " +
        "but making a modded 1.12.2 Java server compatible with the latest Bedrock versions requires multiple complexe " +
        "compatibility layers we do not have the human resources to maintain."
    }
  },
  {
    question: {
      fr: "Comment puis-je commencer à construire ?",
      en: "How do I start building ?"
    },
    answer: {
      fr: "Commencer à construire n'a rien de très sorcier, il vous suffit de rejoindre notre serveur Minecraft et de " +
        "demander à un membre du staff de vous donner le rôle [Débutant]. " +
        "Vous aurez ainsi la permission de construire et le staff suivra votre progression jusqu'à " +
        "ce que vous obteniez le rôle [Builder]." +
        "\n\n" +
        "Des zones dites \"Débutant\" sont mises à votre disposition pour vous entraîner.",
      en: "Getting ready to build is pretty straight forward, you can simply join our Minecraft serveur " +
        "and ask a staff member for the [Débutant] role (débutant means beginner). " +
        "This will grant you building permissions and the staff will follow your progress until you reach the" +
        "[Builder] role." +
        "\n\n" +
        "\"Begginer\" zones have been created to let you try out building in BTE."
    }
  },
  {
    question: {
      fr: "Puis-je construire ce que je veux où bon me semble ?",
      en: "Can I build whatever I want wherever I want?"
    },
    answer: {
      fr: "Vos constructions doivent respecter les règles de construction de Build The Earth. " +
        "Vous devez donc vous contenter de reconstruire des bâtiments du monde réel en suivant les tracés au sol prévu à cet effet." +
        "\n\n" +
        "Si vous êtes [Débutant], vous devez construire dans les zones débutants." +
        "\n\n" +
        "Une fois [Builder] vous être libre de construire où vous le souhaitez sous certaines conditions :\n" +
        " - il est interdit de construire à Paris sans la permission d'@Azguendare ,\n" +
        " - il est interdit de se rendre ailleurs qu'en France, et donc d'y construire,\n" +
        " - il est interdit de construire sur une construction commencée sans l'accord de son constructeur ou du staff.",
      en: "Your constructions must follow the Build The Earth guidelines. " +
        "As a consequence, you should always reproduce a real life building by following the pre-made lines on the ground." +
        "\n\n" +
        "[Begginers] should build in begginer zones." +
        "\n\n" +
        "[Builders] are allowed to build almost anywhere, under some conditions:\n" +
        " - building in Paris is restricted to people approved by @Azguendare\n" +
        " - going anywhere that is not France is forbidden, and you therefore cannot build there\n" +
        " - building over someone else's work is forbidden without explicit permission from the original builder or staff."
    }
  },
  {
    question: {
      fr: "Comment le monde Minecraft est-il généré de manière fidèle à la réalité ?",
      en: "How is the Minecraft world generated in an accurate way ?"
    },
    answer: {
      fr: "Nous utilisons le mod [Terraplusplus](https://www.curseforge.com/minecraft/mc-mods/terraplusplus) " +
        "pour générer une réplique du monde réel dans Minecraft. " +
        "Ce dernier se base sur les informations altimétrique de [Institut national de l'information géographique et forestière](https://www.ign.fr/) " +
        "ainsi que sur la base de donnée géographique libre [OpenStreetMap](https://www.openstreetmap.org)." +
        "\n\n" +
        "Nous utilisons également le mod [CubicChunks](https://www.curseforge.com/minecraft/mc-mods/opencubicchunks) " +
        "qui ne permet d'étendre la hauteur maximale de construction de Minecraft pour la rendre infinie. " +
        "Le mont Blanc est donc bien présent sur BTE France !" +
        "\n\n" +
        "Pour faire correspondre la surface sphérique de la Terre avec le monde plat de Minecraft, " +
        "une projection de carte spécialisée à été mise au point par l'équipe de Build The Earth " +
        "en s'inspirant de la [projection de Fuller](https://fr.wikipedia.org/wiki/Projection_de_Fuller)." +
        "Cette projection est conforme et présente une distorsion relativement faible, " +
        "ce qui nous permet de reproduire les bâtiments du monde réel avec fidélité sur l'ensemble de la planète.",
      en: "We rely on the [Terraplusplus](https://www.curseforge.com/minecraft/mc-mods/terraplusplus) mod to generate " +
        "an accurate reproduction of the Earth in Minecraft. " +
        "It uses elevation data from the French [national institute for geographical and forestry data](https://www.ign.fr/), " +
        "as well as the [OpenStreetMap](https://openstreetmap.org) open geo database. " +
        "\n\n" +
        "We also use the [CubicChunks](https://www.curseforge.com/minecraft/mc-mods/opencubicchunks) mod to extend Minecraft's height limit and make it virtually infinite." +
        "The Alps are no problem at all!" +
        "\n\n" +
        "To map the Earth's spherical surface onto the flat world of Minecraft, " +
        "a custom map projection was designed by the Build The Earth team, taking inspiration from the [Dynmaxion projection](https://en.wikipedia.org/wiki/Dymaxion_map)." +
        "This projection is both conformal and has very low distortion, " +
        "which enables us to accurately reproduce real life buildings in the entire world."
    }
  },
  {
    question: {
      fr: "De quels outils puis-je disposer pour m'aider à construire ?",
      en: "What tools can I use to help me build?"
    },
    answer: {
      fr: "Vous pouvez utiliser toutes sources d'informations qui vous paraît pertinente et " +
        "que vous avez le droit d'utiliser pour tenter d'être le plus fidèle possible à la réalité." +
        "\n\n" +
        "Vous disposez également en jeux de mods et de plugins pour vous assister :\n" +
        " - [WorldEdit](https://www.curseforge.com/minecraft/mc-mods/worldedit)\n" +
        " - [Voxel Sniper](https://dev.bukkit.org/projects/voxelsniper) (réservé aux [Contremaîtres])\n" +
        " - [Terramap](https://www.curseforge.com/minecraft/mc-mods/terramap)\n" +
        " - [TerraRenderer](https://www.curseforge.com/minecraft/mc-mods/bteterrarenderer) (doit être installé manuellement)\n" +
        " - Vous être libre de modifier votre jeux comme bon vous semble si d'autres outils vous paraissent pertinents.",
      en: "You can use any data source you consider relevant to try to be the most realist possible, " +
        "as long as you are legally allowed to use it." +
        "\n\n" +
        "In game, you are also provided with mods and plugins to assist you:\n" +
        " - [WorldEdit](https://www.curseforge.com/minecraft/mc-mods/worldedit)\n" +
        " - [Voxel Sniper](https://dev.bukkit.org/projects/voxelsniper) (exclusive to the [Contremaîtres] rank)\n" +
        " - [Terramap](https://www.curseforge.com/minecraft/mc-mods/terramap)\n" +
        " - [TerraRenderer](https://www.curseforge.com/minecraft/mc-mods/bteterrarenderer) (needs to be installed manually)\n" +
        " - You are free to modify you game as you see fit if other tools come to your attention."
    }
  }
]