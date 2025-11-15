import React, { useState } from 'react';
import { Calculator, TrendingDown, Activity } from 'lucide-react';

export default function CalorieCalculator() {
  const [formData, setFormData] = useState({
    sexe: 'Homme',
    poids: '',
    taille: '',
    age: '',
    activite: 'sedentaire'
  });

  const [result, setResult] = useState(null);

  const activiteFactors = {
    sedentaire: { label: "Sédentaire (peu ou pas d'exercice)", value: 1.2 },
    leger: { label: "Légèrement actif (1-3 j/semaine)", value: 1.375 },
    modere: { label: "Actif (3-5 j/semaine)", value: 1.55 },
    actif: { label: "Très actif (6-7 j/semaine)", value: 1.725 },
    extreme: { label: "Extrêmement actif (2x/jour, sport intense)", value: 1.9 }
  };

  // Helper component for deficit cards with pleasure margin
  const DeficitCard = ({ type, data, otherDeficitData, phase }) => {
    const isModere = type === 'modere';
    const color = isModere ? 'green' : 'orange';
    const label = isModere ? 'Déficit Modéré ⭐' : 'Déficit Intense';
    const description = isModere ? 'Perte lente mais durable (-300 kcal)' : 'Perte rapide, idéale en fin de programme (-500 kcal)';
    
    const hasWarning = data.hasWarning;
    const otherHasWarning = otherDeficitData?.hasWarning;
    
    return (
      <div className={`bg-gradient-to-r from-${color}-900/40 to-${color}-800/40 rounded-2xl p-6 border border-${color}-700/50 shadow-xl`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <TrendingDown className={`w-8 h-8 text-${color}-400`} />
            <div>
              <h3 className="text-xl font-bold text-white">{label}</h3>
              <p className="text-sm text-gray-300">{description}</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-bold text-${color}-400`}>{data.deficit}</div>
            <div className="text-sm text-gray-300">kcal/jour</div>
          </div>
        </div>

        {/* Pleasure Margin or Warning */}
        {!hasWarning ? (
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/10">
              <div>
                <p className="text-sm font-semibold text-white mb-1">Apports caloriques du programme</p>
                <p className="text-xs text-gray-400 mb-2">Petit-déj 400 kcal + Déjeuner 700 kcal + Dîner 700 kcal</p>
                <p className="text-xs text-gray-400 italic">
                  ⚠️ Les valeurs peuvent légèrement varier d'un jour à l'autre selon les repas, pensez à recalculer.
                </p>
              </div>
              <div className={`text-2xl font-bold text-${color}-400`}>
                1800 kcal
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white mb-1">Marge Plaisir 🍕</p>
                <p className="text-xs text-gray-400">Nombre de calories hors repas à répartir selon vos envies</p>
              </div>
              <div className={`text-2xl font-bold text-${color}-400`}>
                {data.marge} kcal
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-red-900/30 border border-red-700/50 rounded-lg p-4">
            <p className="text-sm font-semibold text-red-400 mb-2">⚠️ Attention</p>
            {!isModere && !otherHasWarning ? (
              // Optimal < 1800 but Modéré >= 1800
              <p className="text-xs text-gray-300 leading-relaxed">
                Votre déficit optimal ({data.deficit} kcal) est inférieur au programme de base (1800 kcal). 
                <span className="font-semibold text-white"> Nous vous conseillons de privilégier le déficit modéré</span> ({otherDeficitData.deficit} kcal) 
                qui vous offre une marge plaisir de {otherDeficitData.marge} kcal tout en assurant une progression durable.
              </p>
            ) : (
              // Both < 1800
              <div className="text-xs text-gray-300 leading-relaxed space-y-2">
                <p>
                  Votre {isModere ? 'déficit modéré' : 'déficit optimal'} ({data.deficit} kcal) est inférieur au programme de base (1800 kcal).
                  {Math.abs(data.marge) > 0 && ` Il manque environ ${Math.abs(data.marge)} kcal.`}
                </p>
                <p className="font-semibold text-white">Options recommandées :</p>
                <ul className="space-y-1 ml-4">
                  <li>• Réduire le petit-déjeuner de 400 à {Math.max(200, 400 + data.marge)} kcal</li>
                  <li>• Réduire légèrement les portions des repas principaux</li>
                  <li>• Augmenter votre niveau d'activité pour créer plus de marge</li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setResult(null);
  };

  const calculateCalories = () => {
    const poids = parseFloat(formData.poids);
    const taille = parseFloat(formData.taille);
    const age = parseFloat(formData.age);

    if (!poids || !taille || !age) {
      return;
    }

    // Formule de Mifflin-St Jeor
    let bmr;
    if (formData.sexe === 'Homme') {
      bmr = (10 * poids) + (6.25 * taille) - (5 * age) + 5;
    } else {
      bmr = (10 * poids) + (6.25 * taille) - (5 * age) - 161;
    }

    const PROGRAMME_BASE = 1800; // kcal du programme (400 + 700 + 700)

    // Calcul pour niveau actuel (Phase Reset)
    const tdeeActuel = bmr * activiteFactors[formData.activite].value;
    const deficitModereActuel = tdeeActuel - 300;
    const deficitOptimalActuel = tdeeActuel - 500;

    // Calcul pour phases suivantes : MAX(niveau actuel, "Actif")
    const activiteOrder = ['sedentaire', 'leger', 'modere', 'actif', 'extreme'];
    const niveauProgramme = activiteOrder.indexOf(formData.activite) >= activiteOrder.indexOf('modere') 
      ? formData.activite 
      : 'modere';
    
    const tdeeActif = bmr * activiteFactors[niveauProgramme].value;
    const deficitModereActif = tdeeActif - 300;
    const deficitOptimalActif = tdeeActif - 500;

    // Helper function to calculate pleasure margin and warnings
    const calculateMargeInfo = (deficit) => {
      const marge = deficit - PROGRAMME_BASE;
      return {
        marge: Math.round(marge),
        hasWarning: deficit < PROGRAMME_BASE,
        deficit: Math.round(deficit)
      };
    };

    setResult({
      phaseReset: {
        maintenance: Math.round(tdeeActuel),
        deficitModere: calculateMargeInfo(deficitModereActuel),
        deficitOptimal: calculateMargeInfo(deficitOptimalActuel)
      },
      phaseActive: {
        maintenance: Math.round(tdeeActif),
        deficitModere: calculateMargeInfo(deficitModereActif),
        deficitOptimal: calculateMargeInfo(deficitOptimalActif)
      },
      niveauActuel: formData.activite,
      niveauProgramme: niveauProgramme,
      showPhaseExplanation: activiteOrder.indexOf(formData.activite) < activiteOrder.indexOf('modere')
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="w-10 h-10 text-red-500" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
              Calculateur Autopilot
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            Déterminez votre déficit calorique optimal pour atteindre vos objectifs
          </p>
        </div>

        {/* Activity Level Guide */}
        <div className="bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-600 mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Activity className="w-6 h-6 text-red-500" />
            Comprendre les niveaux d'activité
          </h2>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex gap-3">
              <span className="text-red-500 font-bold">•</span>
              <div>
                <span className="font-semibold text-white">Sédentaire :</span> Travail de bureau, peu ou pas d'exercice planifié
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-red-500 font-bold">•</span>
              <div>
                <span className="font-semibold text-white">Légèrement actif :</span> Exercice léger 1-3 jours/semaine (marche, yoga occasionnel)
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-red-500 font-bold">•</span>
              <div>
                <span className="font-semibold text-white">Actif :</span> Exercice modéré 3-5 jours/semaine (musculation, cardio régulier)
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-red-500 font-bold">•</span>
              <div>
                <span className="font-semibold text-white">Très actif :</span> Exercice intense 6-7 jours/semaine (entraînement quotidien)
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-red-500 font-bold">•</span>
              <div>
                <span className="font-semibold text-white">Extrêmement actif :</span> Entraînement intense 2x/jour (athlètes, préparation physique)
              </div>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700 mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Sexe */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Sexe
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['Homme', 'Femme'].map(sexe => (
                  <button
                    key={sexe}
                    onClick={() => handleInputChange({ target: { name: 'sexe', value: sexe }})}
                    className={`py-3 px-4 rounded-lg font-medium transition-all ${
                      formData.sexe === sexe
                        ? 'bg-red-600 text-white shadow-lg shadow-red-500/50'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {sexe}
                  </button>
                ))}
              </div>
            </div>

            {/* Poids */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Poids (kg)
              </label>
              <input
                type="number"
                name="poids"
                value={formData.poids}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/50 transition-all"
                placeholder="Ex: 75"
              />
            </div>

            {/* Taille */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Taille (cm)
              </label>
              <input
                type="number"
                name="taille"
                value={formData.taille}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/50 transition-all"
                placeholder="Ex: 175"
              />
            </div>

            {/* Âge */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Âge
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/50 transition-all"
                placeholder="Ex: 30"
              />
            </div>
          </div>

          {/* Niveau d'activité */}
          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Niveau d'activité
            </label>
            <select
              name="activite"
              value={formData.activite}
              onChange={handleInputChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/50 transition-all"
            >
              {Object.entries(activiteFactors).map(([key, { label }]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Calculate Button */}
          <button
            onClick={calculateCalories}
            className="w-full mt-8 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-[1.02] shadow-lg shadow-red-500/50 flex items-center justify-center gap-2"
          >
            <Calculator className="w-5 h-5" />
            Calculer mes besoins caloriques
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="animate-fade-in space-y-8">
            {/* Phase explanation - only for users below "Actif" level */}
            {result.showPhaseExplanation && (
              <div className="bg-red-900/20 border border-red-700/50 rounded-xl p-5">
                <p className="text-sm text-gray-200 leading-relaxed">
                  <span className="font-semibold text-red-400">💡 Important :</span> Le calculateur vous propose 2 estimations : 
                  une pour votre <span className="font-semibold">niveau actuel</span> (Phase Reset) et une pour quand vous serez 
                  <span className="font-semibold"> actif grâce au programme</span> (Phases suivantes). Utilisez la bonne estimation selon votre phase !
                </p>
              </div>
            )}

            {result.showPhaseExplanation ? (
              // Show two phases for users below "Actif"
              <>
                {/* Phase Reset */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-1 w-12 bg-gradient-to-r from-red-500 to-red-700 rounded"></div>
                    <h2 className="text-2xl font-bold text-white">Phase Reset</h2>
                    <div className="h-1 flex-1 bg-gradient-to-r from-red-700 to-transparent rounded"></div>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">
                    Basé sur votre niveau d'activité actuel ({activiteFactors[result.niveauActuel].label.toLowerCase()})
                  </p>

                  {/* Maintenance Reset */}
                  <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-6 mb-4 border border-gray-600 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Activity className="w-8 h-8 text-white" />
                        <div>
                          <h3 className="text-xl font-bold text-white">Maintenance</h3>
                          <p className="text-sm text-gray-300">Pour maintenir votre poids actuel</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-white">{result.phaseReset.maintenance}</div>
                        <div className="text-sm text-gray-300">kcal/jour</div>
                      </div>
                    </div>
                  </div>

                  {/* Déficit Modéré Reset */}
                  <div className="mb-4">
                    <DeficitCard 
                      type="modere" 
                      data={result.phaseReset.deficitModere} 
                      otherDeficitData={result.phaseReset.deficitOptimal}
                      phase="reset"
                    />
                  </div>

                  {/* Déficit Optimal Reset */}
                  <DeficitCard 
                    type="optimal" 
                    data={result.phaseReset.deficitOptimal} 
                    otherDeficitData={result.phaseReset.deficitModere}
                    phase="reset"
                  />
                </div>

                {/* Phase Active */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-1 w-12 bg-gradient-to-r from-red-500 to-red-700 rounded"></div>
                    <h2 className="text-2xl font-bold text-white">Phases Suivantes</h2>
                    <div className="h-1 flex-1 bg-gradient-to-r from-red-700 to-transparent rounded"></div>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">
                    Basé sur un niveau "{activiteFactors[result.niveauProgramme].label}" - votre objectif avec le programme
                  </p>

                  {/* Maintenance Active */}
                  <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-6 mb-4 border border-gray-600 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Activity className="w-8 h-8 text-white" />
                        <div>
                          <h3 className="text-xl font-bold text-white">Maintenance</h3>
                          <p className="text-sm text-gray-300">Pour maintenir votre poids avec le programme</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-white">{result.phaseActive.maintenance}</div>
                        <div className="text-sm text-gray-300">kcal/jour</div>
                      </div>
                    </div>
                  </div>

                  {/* Déficit Modéré Active */}
                  <div className="mb-4">
                    <DeficitCard 
                      type="modere" 
                      data={result.phaseActive.deficitModere} 
                      otherDeficitData={result.phaseActive.deficitOptimal}
                      phase="active"
                    />
                  </div>

                  {/* Déficit Optimal Active */}
                  <DeficitCard 
                    type="optimal" 
                    data={result.phaseActive.deficitOptimal} 
                    otherDeficitData={result.phaseActive.deficitModere}
                    phase="active"
                  />
                </div>
              </>
            ) : (
              // Show single block for users already at "Actif" or above
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-1 w-12 bg-gradient-to-r from-red-500 to-red-700 rounded"></div>
                  <h2 className="text-2xl font-bold text-white">Vos besoins caloriques</h2>
                  <div className="h-1 flex-1 bg-gradient-to-r from-red-700 to-transparent rounded"></div>
                </div>

                {/* Maintenance */}
                <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-6 mb-4 border border-gray-600 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Activity className="w-8 h-8 text-white" />
                      <div>
                        <h3 className="text-xl font-bold text-white">Maintenance</h3>
                        <p className="text-sm text-gray-300">Pour maintenir votre poids actuel</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-white">{result.phaseActive.maintenance}</div>
                      <div className="text-sm text-gray-300">kcal/jour</div>
                    </div>
                  </div>
                </div>

                {/* Déficit Modéré */}
                <div className="mb-4">
                  <DeficitCard 
                    type="modere" 
                    data={result.phaseActive.deficitModere} 
                    otherDeficitData={result.phaseActive.deficitOptimal}
                    phase="single"
                  />
                </div>

                {/* Déficit Optimal */}
                <DeficitCard 
                  type="optimal" 
                  data={result.phaseActive.deficitOptimal} 
                  otherDeficitData={result.phaseActive.deficitModere}
                  phase="single"
                />
              </div>
            )}

            {/* Info Box */}
            <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-5">
              <p className="text-sm text-gray-300 leading-relaxed">
                <span className="font-semibold text-white">💡 Comment utiliser ces résultats :</span>
              </p>
              <ul className="mt-3 space-y-2 text-sm text-gray-300">
                {result.showPhaseExplanation && (
                  <>
                    <li className="flex gap-2">
                      <span className="text-red-500">•</span>
                      <span><span className="font-semibold text-white">Phase Reset :</span> Utilisez ces valeurs si vous débutez le programme avec votre niveau d'activité actuel</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-red-500">•</span>
                      <span><span className="font-semibold text-white">Phases suivantes :</span> Passez à ces valeurs une fois que vous vous entraînez régulièrement</span>
                    </li>
                  </>
                )}
                <li className="flex gap-2">
                  <span className="text-red-500">•</span>
                  <span><span className="font-semibold text-white">Déficit modéré recommandé :</span> -300 kcal/jour permet une perte progressive et durable, idéal pour préserver la masse musculaire et maintenir l'énergie au quotidien</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500">•</span>
                  <span><span className="font-semibold text-white">Progression vers le déficit intense :</span> Après au moins 6 semaines de déficit modéré bien maîtrisé, vous pourrez passer au déficit intense pour accélérer vos résultats en fin de programme</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-700">
          <p className="text-xs text-gray-500 leading-relaxed max-w-3xl mx-auto">
            Avertissement : Ce calculateur fournit des estimations à titre informatif uniquement. 
            Les résultats ne remplacent pas un avis médical professionnel. Consultez un médecin 
            ou un nutritionniste avant de modifier votre alimentation, surtout si vous avez des 
            conditions médicales préexistantes.
          </p>
        </div>
      </div>
    </div>
  );
}
