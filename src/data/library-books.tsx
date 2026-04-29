import { EnergyScene } from "@/components/3d/scenes/energy-scene";
import { AgricultureScene } from "@/components/3d/scenes/agriculture-scene";
import { CloudScene } from "@/components/3d/scenes/cloud-scene";
import { BiotechScene } from "@/components/3d/scenes/biotech-scene";
import { AIScene } from "@/components/3d/scenes/ai-scene";
import { SpaceScene } from "@/components/3d/scenes/space-scene";
import { CoverScene } from "@/components/3d/scenes/cover-scene";
import { QuantumScene } from "@/components/3d/scenes/quantum-scene";
import { RoboticsScene } from "@/components/3d/scenes/robotics-scene";
import { ClimateScene } from "@/components/3d/scenes/climate-scene";
import { EpilogueScene } from "@/components/3d/scenes/epilogue-scene";

// Nuevos imports para los libros específicos
import { CellScene } from "@/components/3d/scenes/cell-scene";
import { BrainScene } from "@/components/3d/scenes/brain-scene";
import { FusionScene } from "@/components/3d/scenes/fusion-scene";
import { MetaScene } from "@/components/3d/scenes/meta-scene";
import { SwarmScene } from "@/components/3d/scenes/swarm-scene";
import { DarkMatterScene } from "@/components/3d/scenes/dark-matter-scene";
import { HoloScene } from "@/components/3d/scenes/holo-scene";
import { LongevityScene } from "@/components/3d/scenes/longevity-scene";
import { QuantumNetScene } from "@/components/3d/scenes/quantum-net-scene";
import { AsteroidScene } from "@/components/3d/scenes/asteroid-scene";
import { SmartDustScene } from "@/components/3d/scenes/smart-dust-scene";
import { BioPrintScene } from "@/components/3d/scenes/bio-print-scene";
import { IonDriveScene } from "@/components/3d/scenes/ion-drive-scene";
import { DroneScene } from "@/components/3d/scenes/drone-scene";
import { SmartGridScene } from "@/components/3d/scenes/smart-grid-scene";
import { TardigradeScene } from "@/components/3d/scenes/tardigrade-scene";
import { 
  SpaceAromaScene, TimeGravityScene, VenusDayScene, TreesStarsScene, 
  SlimeMoldScene, TriplePointScene, BlackHoleSongScene, SharksTreesScene, 
  SunLightScene, BoneStrengthScene, CloudWeightScene, StomachAcidScene, 
  SuperfluidScene, SpaceBurpScene, WombatPoopScene, DiamondPlanetScene, 
  AstronautHeightScene, BeigeUniverseScene, GlassFrogScene, EiffelSummerScene, 
  MantisShrimpScene 
} from "@/components/3d/scenes/curiosity-scenes";

export const libraryBooks = [
  {
    id: "intro",
    title: "Ingenierando el Futuro",
    color: "#4a3525", // Wood/leather tone
    content: "Crónicas del siglo XXI desde el laboratorio.\n\nEdición 001 / Vol. ∞ / SIGLO XXI.",
    tags: ["INTRO", "CRÓNICAS"],
    Scene: CoverScene
  },
  {
    id: "energy",
    title: "Energía y Movilidad",
    color: "#8b2500", // Warm dark red
    content: "La ansiedad por la autonomía ha muerto.\n\nEn los laboratorios de CATL, las arquitecturas Shenxing y Qilin han reescrito las reglas de la termodinámica del almacenamiento de energía. Ya no estamos limitados por el frío glacial que solía drenar nuestras celdas. A través de innovaciones en materiales de ánodo y gestión térmica a nivel de sistema, el invierno dejó de ser el enemigo del vehículo eléctrico.",
    tags: ["BATERÍAS", "MOVILIDAD EV", "-30°C", "1500km"],
    Scene: EnergyScene
  },
  {
    id: "agriculture",
    title: "Agricultura Vertical",
    color: "#1e4d2b", // Deep forest green
    content: "La tierra cultivable es una tecnología obsoleta.\n\nAl trasladar la fotosíntesis a entornos hipercontrolados y apilarla verticalmente, hemos abstraído la agricultura de las inclemencias climáticas. Las granjas verticales son fábricas de biomasa de alta precisión donde la iluminación LED pulsada dicta los ritmos circadianos de las plantas.",
    tags: ["SOSTENIBILIDAD", "LED", "-95% AGUA"],
    Scene: AgricultureScene
  },
  {
    id: "cloud",
    title: "Infraestructura Digital",
    color: "#1a365d", // Deep navy
    content: "La nube no existe.\n\nLo que llamamos 'nube' es, en realidad, la hiper-materialidad de la red. Millones de kilómetros de cables submarinos de fibra óptica y centros de datos que devoran gigavatios. La verdadera innovación radica en la orquestación: la abstracción completa del hardware físico mediante virtualización extrema.",
    tags: ["5G", "SERVIDORES DISTRIBUIDOS", "LATENCIA 1ms"],
    Scene: CloudScene
  },
  {
    id: "biotech",
    title: "Biotecnología",
    color: "#4a1c40", // Deep purple
    content: "El cuerpo como hardware.\n\nLa línea divisoria entre el silicio y la célula se ha disuelto. La edición genética mediante herramientas como CRISPR-Cas9 nos ha entregado las llaves del código fuente de la vida. Ya no solo observamos pasivamente el declive biológico; aplicamos parches, recompilamos tejidos y actualizamos nuestro sistema inmune.",
    tags: ["CRISPR", "BIOSENSORES", "CARNE CULTIVADA"],
    Scene: BiotechScene
  },
  {
    id: "ai",
    title: "Inteligencia Artificial",
    color: "#6b1d1d", // Dark crimson
    content: "Máquinas que sueñan, máquinas que fallan.\n\nHemos enseñado a la arena a pensar, y ahora nos enfrentamos a las consecuencias. Los modelos fundacionales exhiben propiedades emergentes imposibles de predecir por sus propios creadores. Mientras automatizamos la detección de vulnerabilidades con eficiencia aterradora, engendramos el riesgo sistémico más profundo de nuestra era.",
    tags: ["LLM", "RIESGO SISTÉMICO", "ALINEACIÓN"],
    Scene: AIScene
  },
  {
    id: "space",
    title: "Ingeniería Espacial",
    color: "#111111", // Almost black
    content: "Volver a la luna.\n\nArtemis II no es un ejercicio de nostalgia; es la prueba de concepto para la expansión humana multiplanetaria. La nave Orion y el cohete SLS representan la culminación de décadas de ingeniería aeroespacial iterativa. Volvemos a nuestro satélite empleando una trayectoria de retorno libre.",
    tags: ["ARTEMIS", "ORION", "RETORNO LIBRE"],
    Scene: SpaceScene
  },
  {
    id: "quantum",
    title: "Computación Cuántica",
    color: "#0a2a4a", // Deep quantum blue
    content: "El colapso de la criptografía clásica.\n\nLos qubits no son simples bits acelerados; representan un cambio de paradigma ontológico en el procesamiento de información. Al manipular la superposición y el entrelazamiento cuántico a temperaturas cercanas al cero absoluto, estamos resolviendo problemas de química de materiales y logística en milisegundos que a los superordenadores tradicionales les tomaría milenios.",
    tags: ["QUBITS", "ENTRELAZAMIENTO", "CERO ABSOLUTO"],
    Scene: QuantumScene
  },
  {
    id: "robotics",
    title: "Robótica Avanzada",
    color: "#3d3d3d", // Industrial grey
    content: "La autonomía mecánica total.\n\nHemos superado la era de los brazos robóticos pre-programados. Integrando modelos de visión computacional y aprendizaje por refuerzo, los nuevos actuadores poseen una propiocepción hiper-precisa y adaptabilidad en tiempo real. La línea de ensamblaje del siglo XXI ya no es una coreografía estática, sino un ecosistema colaborativo fluido.",
    tags: ["AUTOMATIZACIÓN", "VISIÓN COMPUTACIONAL", "PROPIOCEPCIÓN"],
    Scene: RoboticsScene
  },
  {
    id: "climate",
    title: "Geoingeniería Global",
    color: "#1c3f2d",
    content: "Hackeando el termostato terrestre.\n\nLa mitigación de emisiones fue insuficiente; hemos entrado en la era de la intervención atmosférica activa. Desde el despliegue estratosférico de aerosoles reflectantes (SRM) hasta mega-estructuras de captura directa de aire, estamos diseñando escudos planetarios y reescribiendo los flujos de carbono para evitar el colapso de los biomas críticos.",
    tags: ["SRM", "CAPTURA DE CARBONO", "ESCUDOS"],
    Scene: ClimateScene
  },
  // 16 NEW BOOKS TO FILL SHELF 1
  { id: "synth-bio", title: "Biología Sintética", color: "#2b1c3f", content: "Programando células desde cero.\n\nHemos dejado de editar el genoma para comenzar a escribirlo.", tags: ["ADN", "SINTÉTICO", "CÉLULAS"], Scene: CellScene },
  { id: "neuro-link", title: "Interfaces BCI", color: "#3f1c2a", content: "La conexión cerebro-máquina.\n\nEl ancho de banda humano se ha expandido mediante electrodos ultradelgados.", tags: ["NEURALINK", "BCI", "CIBORG"], Scene: BrainScene },
  { id: "fusion", title: "Fusión Nuclear", color: "#1c3f3b", content: "El sol en una botella.\n\nEl confinamiento magnético finalmente ha logrado ignición neta positiva constante.", tags: ["ITER", "PLASMA", "ENERGÍA"], Scene: FusionScene },
  { id: "meta", title: "Metamateriales", color: "#3a3f1c", content: "Doblando la luz a voluntad.\n\nEstructuras nanométricas que desafían la refracción clásica.", tags: ["INVISIBILIDAD", "NANO", "ÓPTICA"], Scene: MetaScene },
  { id: "swarm", title: "Robótica de Enjambre", color: "#3f281c", content: "Inteligencia distribuida.\n\nMillones de micro-robots cooperando como una colonia de hormigas mecánicas.", tags: ["ENJAMBRE", "MICRO-ROBOTS", "RED"], Scene: SwarmScene },
  { id: "dark-matter", title: "Materia Oscura", color: "#111111", content: "Lo invisible que nos rodea.\n\nNuevos sensores gravitacionales detectan anomalías subatómicas.", tags: ["FÍSICA", "COSMOS", "GRAVEDAD"], Scene: DarkMatterScene },
  { id: "holo", title: "Holografía Táctil", color: "#1c2b3f", content: "Luz con resistencia física.\n\nEl uso de ultrasonido focalizado permite tocar las proyecciones.", tags: ["HÁPTICO", "ULTRASONIDO", "HOLO"], Scene: HoloScene },
  { id: "longevity", title: "Terapias de Longevidad", color: "#4f1c34", content: "El envejecimiento como enfermedad.\n\nSenolíticos y reprogramación epigenética celular.", tags: ["TELÓMEROS", "SENOLÍTICOS", "VIDA"], Scene: LongevityScene },
  { id: "quantum-net", title: "Internet Cuántico", color: "#1c4f48", content: "Seguridad absoluta.\n\nTeletransportación de estados cuánticos a través de nodos de diamante.", tags: ["QKD", "TELETRANSPORTE", "SEGURIDAD"], Scene: QuantumNetScene },
  { id: "asteroid", title: "Minería Espacial", color: "#4f381c", content: "La fiebre del oro en el cinturón.\n\nExtrayendo tierras raras de asteroides tipo M.", tags: ["ASTEROIDES", "PLATINO", "ESPACIO"], Scene: AsteroidScene },
  { id: "smart-dust", title: "Polvo Inteligente", color: "#2f4f1c", content: "Sensores del tamaño de granos de arena.\n\nMonitoreo ubicuo de la atmósfera y el suelo.", tags: ["SENSORES", "IOT", "UBICUO"], Scene: SmartDustScene },
  { id: "print-organs", title: "Bioimpresión 3D", color: "#4f1c1c", content: "Órganos bajo demanda.\n\nImpresoras que depositan capas de células vivas.", tags: ["ÓRGANOS", "BIO-TINTA", "TRANSPLANTES"], Scene: BioPrintScene },
  { id: "fusion-drive", title: "Propulsión Iónica", color: "#1c1c4f", content: "Cruzando el sistema solar.\n\nMotores iónicos de efecto Hall hiper-eficientes.", tags: ["PROPULSIÓN", "XENÓN", "MARTE"], Scene: IonDriveScene },
  { id: "agri-drones", title: "Agro-Drones", color: "#384f1c", content: "Vigilancia de cultivos desde el cielo.\n\nAnálisis hiperespectral de estrés hídrico.", tags: ["DRONES", "HIPERESPECTRAL", "CULTIVOS"], Scene: DroneScene },
  { id: "smart-grid", title: "Redes Eléctricas IA", color: "#4f411c", content: "Distribución descentralizada.\n\nAlgoritmos predictivos balanceando el consumo en milisegundos.", tags: ["SMART-GRID", "IA", "ENERGÍA"], Scene: SmartGridScene },
  { id: "epilogue", title: "El Futuro Incierto", color: "#000000", content: "Nuestra historia no termina, apenas está comenzando.\n\nCada simulación extraída es apenas el prólogo de una civilización que se niega a permanecer estática.", tags: ["PRÓLOGO", "SINGULARIDAD", "HORIZONTE"], Scene: EpilogueScene },

  // ----------------------------------------------------
  // SHELF 2: DATOS CURIOSOS CON IMÁGENES
  // ----------------------------------------------------
  {
    id: "curious-internet",
    title: "El Peso de Internet",
    color: "#00ffff",
    content: "DATO CURIOSO // EL PESO DE LOS DATOS\n\nSi sumáramos todos los electrones en movimiento que componen la información de Internet en un momento dado, su peso físico total sería aproximadamente igual al de una fresa pequeña (unos 50 gramos).\n\nSin embargo, la infraestructura física necesaria para mantener esa fresa de electrones fluyendo consume miles de megavatios.",
    tags: ["INTERNET", "FÍSICA", "DATOS"],
    imageUrl: "/images/internet_weight.png"
  },
  {
    id: "curious-water",
    title: "El Embalse Cósmico",
    color: "#0088ff",
    content: "DATO CURIOSO // AGUA EN EL ESPACIO\n\nA 12 mil millones de años luz de la Tierra, existe una nube de vapor de agua flotando en el espacio que contiene 140 billones de veces más agua que todos los océanos de la Tierra juntos.\n\nRodea un agujero negro supermasivo (un cuásar) y es la masa de agua más grande y lejana jamás descubierta en el universo.",
    tags: ["COSMOS", "AGUA", "CUÁSAR"],
    imageUrl: "/images/water_space.png"
  },
  {
    id: "curious-banana",
    title: "Plátanos Radiactivos",
    color: "#ffff00",
    content: "DATO CURIOSO // RADIACIÓN COTIDIANA\n\nLos plátanos son ligeramente radiactivos. Contienen potasio-40, un isótopo radiactivo natural.\n\nDe hecho, existe una unidad de medida humorística en ciencia llamada 'Dosis Equivalente a un Plátano' (BED). Para morir por envenenamiento por radiación, tendrías que comerte unos 10 millones de plátanos de una sola vez.",
    tags: ["ISÓTOPOS", "RADIACIÓN", "POTASIO"],
    imageUrl: "/images/neon_banana.png"
  },
  {
    id: "curious-octopus",
    title: "La Mente del Pulpo",
    color: "#ff00ff",
    content: "DATO CURIOSO // INTELIGENCIA ALIENÍGENA\n\nLos pulpos tienen tres corazones, sangre azul y nueve cerebros.\n\nTienen un cerebro central y un cerebro más pequeño en cada uno de sus ocho tentáculos. Esto significa que cada tentáculo puede pensar y actuar de forma independiente o en colaboración con el resto del cuerpo, siendo lo más parecido a una inteligencia extraterrestre en la Tierra.",
    tags: ["BIOLOGÍA", "NEUROCIENCIA", "PULPOS"],
    imageUrl: "/images/cyber_octopus.png"
  },
  {
    id: "curious-dna",
    title: "La Autopista Genética",
    color: "#00ff88",
    content: "DATO CURIOSO // LONGITUD DEL ADN\n\nSi desenredáramos el ADN de todas las células de tu cuerpo y lo pusiéramos en línea recta, se extendería unos 16 mil millones de kilómetros.\n\nEso es suficiente para ir desde la Tierra hasta Plutón y volver... no una, ¡sino varias veces! Toda esa información está comprimida en estructuras microscópicas dentro de ti.",
    tags: ["GENÉTICA", "ADN", "DISTANCIA"],
    imageUrl: "/images/dna_highway.png"
  },
  {
    id: "curious-space-steak",
    title: "Olor a Espacio",
    color: "#ff8800",
    content: "DATO CURIOSO // EL AROMA DEL COSMOS\n\nLos astronautas que regresan de caminatas espaciales informan consistentemente que sus trajes huelen a 'filete frito', 'metal caliente' y 'humo de soldadura'.\n\nEste olor metálico proviene de los hidrocarburos aromáticos policíclicos (HAP), subproductos de estrellas moribundas que flotan por el universo.",
    tags: ["ESPACIO", "AROMA", "ESTRELLAS"],
    Scene: SpaceAromaScene
  },
  {
    id: "curious-time-gravity",
    title: "El Tiempo Relativo",
    color: "#ff00ff",
    content: "DATO CURIOSO // DILATACIÓN TEMPORAL\n\nEl tiempo corre más rápido en la parte superior de un rascacielos que en el suelo.\n\nDebido a la Teoría de la Relatividad General de Einstein, la gravedad curva el tiempo. Más lejos del núcleo de la Tierra (menos gravedad), el tiempo transcurre fracciones de nanosegundo más deprisa. Tu cabeza es literalmente más vieja que tus pies.",
    tags: ["RELATIVIDAD", "TIEMPO", "FÍSICA"],
    Scene: TimeGravityScene
  },
  {
    id: "curious-venus-day",
    title: "El Día Eterno",
    color: "#ffff00",
    content: "DATO CURIOSO // ROTACIÓN PLANETARIA\n\nUn día en Venus es más largo que un año en Venus.\n\nVenus tarda 243 días terrestres en girar una vez sobre su eje, pero solo 225 días terrestres en dar una vuelta completa alrededor del sol. Además, gira en dirección opuesta a la Tierra, por lo que el Sol sale por el oeste y se pone por el este.",
    tags: ["VENUS", "ÓRBITA", "TIEMPO"],
    Scene: VenusDayScene
  },
  {
    id: "curious-trees-stars",
    title: "Bosques vs Estrellas",
    color: "#00ff44",
    content: "DATO CURIOSO // ESCALA DE LA VIDA\n\nHay más árboles en la Tierra que estrellas en la Vía Láctea.\n\nSe estima que hay entre 100 y 400 mil millones de estrellas en nuestra galaxia. Sin embargo, la Tierra alberga más de 3 billones (3,000,000,000,000) de árboles. La vida verde supera a las luces estelares.",
    tags: ["ÁRBOLES", "GALAXIA", "ESCALA"],
    Scene: TreesStarsScene
  },
  {
    id: "curious-slime-mold",
    title: "Hongos Ingenieros",
    color: "#aaff00",
    content: "DATO CURIOSO // INTELIGENCIA SIN CEREBRO\n\nEl moho mucilaginoso (Physarum polycephalum) no tiene cerebro ni sistema nervioso, pero puede resolver laberintos.\n\nBuscando comida, crea redes de tubos óptimas. Científicos colocaron copos de avena replicando las ciudades alrededor de Tokio, y el moho recreó en horas el diseño del sistema ferroviario que a los ingenieros humanos les tomó décadas diseñar.",
    tags: ["BIOLOGÍA", "MOHO", "REDES"],
    Scene: SlimeMoldScene
  },
  {
    id: "curious-triple-point",
    title: "El Punto Triple",
    color: "#00ffff",
    content: "DATO CURIOSO // TERMODINÁMICA\n\nEl agua puede hervir y congelarse al mismo tiempo.\n\nEste fenómeno se llama 'punto triple'. Ocurre cuando la temperatura y la presión son exactamente las adecuadas para que las tres fases (gas, líquido y sólido) de una sustancia coexistan en equilibrio termodinámico.",
    tags: ["AGUA", "FÍSICA", "PRESIÓN"],
    Scene: TriplePointScene
  },
  {
    id: "curious-black-hole-song",
    title: "El Canto del Abismo",
    color: "#4400ff",
    content: "DATO CURIOSO // ACÚSTICA ESPACIAL\n\nLos agujeros negros 'cantan'.\n\nEn 2003, los astrónomos descubrieron ondas sonoras propagándose por el gas que rodea un agujero negro supermasivo en el cúmulo de Perseo. La nota es un Si bemol, pero 57 octavas por debajo del Do central—una frecuencia demasiado baja para el oído humano.",
    tags: ["SONIDO", "AGUJERO NEGRO", "ASTRONOMÍA"],
    Scene: BlackHoleSongScene
  },
  {
    id: "curious-sharks-trees",
    title: "Ancianos del Mar",
    color: "#0044ff",
    content: "DATO CURIOSO // EVOLUCIÓN\n\nLos tiburones son más antiguos que los árboles.\n\nLos tiburones han nadado en los océanos durante más de 400 millones de años, sobreviviendo a cinco extinciones masivas. Los primeros árboles verdaderos no aparecieron en la Tierra hasta hace unos 350 millones de años.",
    tags: ["TIBURONES", "ÁRBOLES", "TIEMPO"],
    Scene: SharksTreesScene
  },
  {
    id: "curious-sun-light",
    title: "Luz Milenaria",
    color: "#ffff88",
    content: "DATO CURIOSO // FOTONES\n\nLa luz solar que calienta tu piel hoy tiene más de 30,000 años de antigüedad.\n\nAunque un fotón tarda solo 8 minutos en viajar desde la superficie del Sol hasta la Tierra, le toma decenas de miles de años abrirse paso a través de la densa zona radiativa desde el núcleo del Sol hasta su superficie.",
    tags: ["SOL", "FOTONES", "TIEMPO"],
    Scene: SunLightScene
  },
  {
    id: "curious-bone-strength",
    title: "Concreto Biológico",
    color: "#ffffff",
    content: "DATO CURIOSO // BIOMECÁNICA\n\nEl hueso humano es más fuerte que el concreto.\n\nKilo por kilo, el hueso humano puede soportar más peso que el hormigón sólido. Un bloque de hueso del tamaño de una caja de fósforos puede soportar casi 9,000 kilogramos de peso, debido a su intrincada estructura de colágeno y minerales.",
    tags: ["HUESOS", "RESISTENCIA", "BIOLOGÍA"],
    Scene: BoneStrengthScene
  },
  {
    id: "curious-cloud-weight",
    title: "Nubes de Plomo",
    color: "#cccccc",
    content: "DATO CURIOSO // METEOROLOGÍA\n\nUna nube cumulus promedio pesa más de 500,000 kilogramos (1.1 millones de libras).\n\nEso es el equivalente a 100 elefantes flotando sobre tu cabeza. Las nubes están formadas por incontables y diminutas gotas de agua dispersas en un espacio masivo, lo que les permite 'flotar' en el aire denso de abajo.",
    tags: ["NUBES", "PESO", "ATMÓSFERA"],
    Scene: CloudWeightScene
  },
  {
    id: "curious-stomach-acid",
    title: "Ácido Disolvente",
    color: "#00ff00",
    content: "DATO CURIOSO // QUÍMICA CORPORAL\n\nEl ácido de tu estómago es lo suficientemente fuerte como para disolver hojas de afeitar.\n\nCon un pH entre 1.5 y 3.5, el ácido clorhídrico en tu estómago puede corroer metal. En experimentos de laboratorio, las hojas de afeitar de un solo filo se disolvieron después de 24 horas inmersas en ácido estomacal.",
    tags: ["ÁCIDO", "METABOLISMO", "QUÍMICA"],
    Scene: StomachAcidScene
  },
  {
    id: "curious-superfluid",
    title: "Física Imposible",
    color: "#00ccff",
    content: "DATO CURIOSO // CERO ABSOLUTO\n\nCuando el helio se enfría cerca del cero absoluto (-273 °C), se convierte en un superfluido.\n\nEn este estado de la materia cuántica, el líquido fluye sin ninguna fricción. Puede escalar por las paredes de un vaso de cristal y atravesar poros microscópicos que serían impermeables al gas.",
    tags: ["HELIO", "SUPERFLUIDO", "CUÁNTICA"],
    Scene: SuperfluidScene
  },
  {
    id: "curious-space-burp",
    title: "Digestión Espacial",
    color: "#ffaaff",
    content: "DATO CURIOSO // GRAVEDAD CERO\n\nEs físicamente imposible eructar en el espacio.\n\nEn la Tierra, la gravedad separa los líquidos pesados de los gases ligeros en tu estómago, permitiendo que el gas escape hacia arriba. En la microgravedad del espacio, todo se mezcla en un fango flotante. Un eructo se convierte en un evento mucho más... húmedo.",
    tags: ["ASTRONAUTAS", "GRAVEDAD", "BIOLOGÍA"],
    Scene: SpaceBurpScene
  },
  {
    id: "curious-wombat-poop",
    title: "Cubos Biológicos",
    color: "#885522",
    content: "DATO CURIOSO // FAUNA EXTREMA\n\nLos wombats son los únicos animales conocidos del mundo que producen caca en forma de cubo.\n\nLos científicos descubrieron que la elasticidad variable de los intestinos del wombat esculpe las heces en cubos perfectos, lo cual evita que se rueden y les permite apilarlas para marcar su territorio.",
    tags: ["WOMBATS", "EVOLUCIÓN", "FAUNA"],
    Scene: WombatPoopScene
  },
  {
    id: "curious-diamond-planet",
    title: "El Planeta Joya",
    color: "#ccffff",
    content: "DATO CURIOSO // EXOPLANETAS\n\nExiste un planeta hecho casi completamente de diamantes.\n\nConocido como 55 Cancri e, este exoplaneta tiene el doble del tamaño de la Tierra y ocho veces su masa. Debido al intenso calor y presión, los astrónomos creen que su capa rica en carbono se ha cristalizado en un diamante masivo.",
    tags: ["DIAMANTE", "EXOPLANETA", "CARBONO"],
    Scene: DiamondPlanetScene
  },
  {
    id: "curious-astronaut-height",
    title: "Crecimiento Orbital",
    color: "#ffaaaa",
    content: "DATO CURIOSO // ADAPTACIÓN ESPACIAL\n\nLos astronautas pueden crecer hasta 5 centímetros (2 pulgadas) en el espacio.\n\nSin la constante compresión de la gravedad terrestre, los discos cartilaginosos de la columna vertebral se expanden ligeramente. Sin embargo, vuelven a su altura original unos meses después de regresar a la Tierra.",
    tags: ["ASTRONAUTAS", "COLUMNA", "GRAVEDAD"],
    Scene: AstronautHeightScene
  },
  {
    id: "curious-beige-universe",
    title: "Latte Cósmico",
    color: "#fff8e7",
    content: "DATO CURIOSO // EL COLOR DEL UNIVERSO\n\nEl color promedio del universo entero es beige.\n\nEn 2002, astrónomos promediaron la luz de 200,000 galaxias. ¿El resultado? Un tono crema blanquecino al que llamaron oficialmente 'Latte Cósmico' (Cosmic Latte). El universo no es oscuro, es color café con leche.",
    tags: ["COLOR", "UNIVERSO", "LATTE CÓSMICO"],
    Scene: BeigeUniverseScene
  },
  {
    id: "curious-glass-frog",
    title: "Órganos a la Vista",
    color: "#aaffaa",
    content: "DATO CURIOSO // CAMUFLAJE EXTREMO\n\nLas ranas de cristal tienen la piel del vientre totalmente transparente.\n\nPuedes ver su corazón latiendo, sus intestinos digiriendo e incluso los huevos desarrollándose en su interior. Los científicos descubrieron recientemente que 'esconden' su sangre en el hígado mientras duermen para volverse casi un 90% transparentes.",
    tags: ["RANAS", "TRANSPARENCIA", "SANGRE"],
    Scene: GlassFrogScene
  },
  {
    id: "curious-eiffel-summer",
    title: "Metal Expansivo",
    color: "#ffaa00",
    content: "DATO CURIOSO // TERMODINÁMICA ESTRUCTURAL\n\nLa Torre Eiffel puede crecer hasta 15 centímetros durante el verano.\n\nDebido a la dilatación térmica, cuando el metal se calienta bajo el sol de verano de París, las partículas adquieren energía cinética y ocupan más volumen. La torre incluso se inclina ligeramente alejándose del sol.",
    tags: ["PARÍS", "METAL", "DILATACIÓN"],
    Scene: EiffelSummerScene
  },
  {
    id: "curious-mantis-shrimp",
    title: "El Golpe Sónico",
    color: "#ff0088",
    content: "DATO CURIOSO // ARMAS BIOLÓGICAS\n\nEl camarón mantis golpea tan rápido que hace hervir el agua a su alrededor.\n\nSus apéndices se aceleran a la velocidad de una bala calibre .22. El golpe genera ondas de cavitación—burbujas de vacío que colapsan emitiendo destellos de luz (sonoluminiscencia) y temperaturas que rivalizan temporalmente con la superficie del sol.",
    tags: ["CAMARÓN MANTIS", "CAVITACIÓN", "VELOCIDAD"],
    Scene: MantisShrimpScene
  },
  {
    id: "curious-immortal-jellyfish",
    title: "La Vida Eterna",
    color: "#88ffff",
    content: "DATO CURIOSO // INMORTALIDAD BIOLÓGICA\n\nExiste una especie de medusa que es biológicamente inmortal.\n\nLa Turritopsis dohrnii, cuando envejece o sufre daños, puede revertir sus células a su estado más temprano de pólipo y comenzar su ciclo de vida de nuevo. Es como si una mariposa pudiera volver a convertirse en oruga a voluntad.",
    tags: ["INMORTALIDAD", "MEDUSAS", "CÉLULAS"],
    Scene: QuantumNetScene
  },
  {
    id: "curious-tardigrade",
    title: "El Superviviente",
    color: "#aaaaaa",
    content: "DATO CURIOSO // RESISTENCIA EXTREMA\n\nLos tardígrados, o cerditos de agua, pueden sobrevivir al vacío del espacio.\n\nEstos animales microscópicos pueden deshidratarse casi por completo y entrar en animación suspendida. Han sobrevivido a temperaturas cercanas al cero absoluto, radiación letal, y a la presión extrema del lecho oceánico más profundo.",
    tags: ["TARDÍGRADO", "SUPERVIVENCIA", "ESPACIO"],
    Scene: TardigradeScene
  }
];
