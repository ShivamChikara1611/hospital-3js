import React, { useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { LanguageContext } from '../context/LanguageContext'

const About = () => {
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(0);
    const { language } = useContext(LanguageContext);

    const texts = {
        en: {
            heading: "About Us",
            intro: `MAX Superspeciality Hospital Management System is a comprehensive digital solution designed to modernize and streamline hospital operations. From patient registrations to AI-powered disease detection, the system empowers hospitals, doctors, and patients with seamless, technology-driven healthcare experiences.`,
            missionTitle: "Mission",
            missionText: "Our mission is to simplify hospital workflows with technology and AI, ensuring efficiency, transparency, and patient-centric care. We strive to make quality healthcare more accessible, smarter, and seamless for everyone.",
            visionTitle: "Vision",
            visionText: "To revolutionize healthcare by reducing waiting times, eliminating overcrowding, and empowering patients with digital access to appointments, reports, and payments—while enabling doctors to focus more on care through AI-driven solutions.",
            challengesTitle: "Challenges We Solve",
            challengesText: `Hospitals often face challenges such as long queues, overcrowded waiting areas, and time-consuming manual processes that create frustration for both patients and staff. Managing paper-based medical records can lead to errors, miscommunication, and difficulties in retrieving critical information when needed. Patients struggle with delayed appointments, lack of transparency in billing, and limited access to their medical history, while doctors spend valuable time handling administrative tasks instead of focusing on patient care. MAX Superspeciality Hospital Management System addresses these challenges by digitizing hospital workflows, streamlining communication, and integrating AI-based tools to provide faster, more reliable, and patient-friendly healthcare services.`,
            keyFeatures: "Key Features",
            patientPanelTitle: "Patient Panel",
            patientPanelText: "The Patient Panel is designed to make healthcare more convenient and accessible. Patients can easily book or cancel appointments online, make secure digital payments, and access their medical history and lab reports anytime. To enhance early detection, the system also integrates an AI-based skin cancer preliminary checkup with an impressive 94% accuracy rate.",
            doctorPanelTitle: "Doctor Panel",
            doctorPanelText: "The Doctor Panel provides doctors with powerful tools to manage their schedules and appointments efficiently. With instant access to patient history, automated reminders, and intelligent slot management, doctors can save time and focus more on delivering quality care. AI-powered insights further support faster and more accurate diagnoses, enabling doctors to provide better treatment outcomes.",
            impactTitle: "Impact & Achievements",
            impactPoints: [
                "60% reduction in patient waiting time.",
                "30–40% reduction in hospital crowding.",
                "Improved patient experience with at-home access to healthcare services.",
                "Enhanced efficiency for doctors and staff."
            ],
            futureTitle: "Future Enhancements",
            futureText: "In the future, MAX Superspeciality Hospital Management System aims to further transform healthcare delivery by integrating with wearable health devices to track real-time patient data and provide continuous monitoring. Telemedicine and video consultations will be introduced to make healthcare more accessible beyond hospital walls, allowing patients to connect with doctors remotely. The system will also feature automated pharmacy and inventory management to ensure efficient resource utilization and reduce shortages. Additionally, AI-driven predictive analytics will be leveraged to identify potential health risks early, enabling proactive interventions and improving patient outcomes."
        },
        jp: {
            heading: "私たちについて",
            intro: `MAXスーパー専門病院管理システムは、病院運営を近代化し効率化するための包括的なデジタルソリューションです。患者登録からAIによる疾病検出まで、病院、医師、患者がシームレスで技術駆動の医療体験を享受できるように設計されています。`,
            missionTitle: "ミッション",
            missionText: "私たちのミッションは、技術とAIを活用して病院のワークフローを簡素化し、効率性、透明性、患者中心のケアを確保することです。質の高い医療をよりアクセスしやすく、スマートでシームレスに提供することを目指しています。",
            visionTitle: "ビジョン",
            visionText: "待ち時間の短縮、混雑の解消、患者が予約・検査結果・支払いにデジタルでアクセスできるようにすることで、医療を革新します。AI駆動のソリューションにより、医師はより多くの時間を患者ケアに集中できます。",
            challengesTitle: "解決する課題",
            challengesText: `病院は長い待ち時間、混雑した待合室、時間のかかる手作業などの課題に直面し、患者やスタッフにフラストレーションを生じさせます。紙ベースの医療記録の管理は、エラー、誤伝達、重要情報の取得困難を招くことがあります。患者は予約の遅延、請求の透明性の欠如、医療履歴へのアクセス制限に悩み、医師は患者ケアより管理業務に多くの時間を費やします。MAXスーパー専門病院管理システムは、ワークフローのデジタル化、コミュニケーションの効率化、AIツールの統合により、迅速で信頼性の高い患者中心の医療サービスを提供します。`,
            keyFeatures: "主要機能",
            patientPanelTitle: "患者用パネル",
            patientPanelText: "患者パネルは、医療をより便利でアクセスしやすくするために設計されています。患者はオンラインで簡単に予約やキャンセルができ、安全なデジタル支払いが可能で、医療履歴や検査結果にいつでもアクセスできます。早期発見を強化するため、AIによる皮膚がんの事前チェック機能も統合されており、94％の精度を誇ります。",
            doctorPanelTitle: "医師用パネル",
            doctorPanelText: "医師パネルは、医師がスケジュールと予約を効率的に管理できる強力なツールを提供します。患者履歴への即時アクセス、自動リマインダー、スマートなスロット管理により、医師は時間を節約し、質の高いケアに集中できます。AIによる洞察は、より迅速かつ正確な診断をサポートし、治療結果を向上させます。",
            impactTitle: "成果と実績",
            impactPoints: [
                "患者の待ち時間を60％短縮。",
                "病院の混雑を30～40％削減。",
                "自宅で医療サービスにアクセスできることで患者体験を向上。",
                "医師やスタッフの効率を向上。"
            ],
            futureTitle: "今後の改善",
            futureText: "将来的に、MAXスーパー専門病院管理システムは、ウェアラブル健康デバイスとの統合により、リアルタイムの患者データを追跡し、継続的なモニタリングを提供します。遠隔医療やビデオ診察を導入し、病院外でも医師と患者をつなげます。さらに、薬局および在庫管理の自動化により、資源の効率的活用と不足の削減を実現します。AI駆動の予測分析を活用して潜在的な健康リスクを早期に特定し、積極的な介入と患者の健康改善を支援します。"
        }
    }

    const t = texts[language]

    return (
        <div className='my-10 flex flex-col items-center mx-2 md:mx-0'>
            <h1 className='text-2xl text-center tracking-wider text-gray-200'>{t.heading}</h1>

            {/* About Intro */}
            <p className='text-gray-400 text-center font-light text-sm tracking-wide mt-5 max-w-[500px] md:max-w-[700px] whitespace-pre-line'>
                {t.intro}
            </p>

            {/* Mission, Vision */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2 mt-16 max-w-[350px] md:max-w-[800px]'>
                {/* Mission */}
                <div className='flex flex-col items-center px-2 md:px-4 py-4 rounded-lg bg-primary/10'>
                    <img src={assets.mission} alt="Mission Icon" className='mb-2 w-10' />
                    <h3 className='text-lg mb-1 text-gray-300 font-thin tracking-widest'>{t.missionTitle}</h3>
                    <p className='text-gray-400 text-xs tracking-wide text-center'>{t.missionText}</p>
                </div>

                {/* Vision */}
                <div className='flex flex-col items-center px-2 md:px-4 py-4 rounded-lg bg-primary/10'>
                    <img src={assets.vision} alt="Vision Icon" className='mb-2 w-10' />
                    <h3 className='text-lg mb-1 text-gray-300 font-thin tracking-widest'>{t.visionTitle}</h3>
                    <p className='text-gray-400 text-xs tracking-wide text-center'>{t.visionText}</p>
                </div>
            </div>

            {/* Challenges We Solve */}
            <div className='my-16 text-center'>
                <h1 className='text-gray-200 text-lg font-normal tracking-wider'>{t.challengesTitle}</h1>
                <p className='mt-2 text-gray-500 text-sm font-light tracking-wide max-w-[600px] md:max-w-[900px] whitespace-pre-line'>
                    {t.challengesText}
                </p>
            </div>

            {/* Key Features */}
            <h1 className='text-gray-200 text-lg font-normal tracking-wider text-center mb-3'>{t.keyFeatures}</h1>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-2 max-w-[350px] md:max-w-[800px]'>

                {/* patient panel */}
                <div className='flex flex-col items-center px-2 md:px-4 py-4 rounded-lg bg-primary/10'>
                    <h3 className='text-lg mb-1 text-gray-200 font-light tracking-widest'>{t.patientPanelTitle}</h3>
                    <p className='text-gray-400 text-xs tracking-wide text-center'>{t.patientPanelText}</p>
                </div>

                {/* Doctor Panel */}
                <div className='flex flex-col items-center px-2 md:px-4 py-4 rounded-lg bg-primary/10'>
                    <h3 className='text-lg mb-1 text-gray-200 font-light tracking-widest'>{t.doctorPanelTitle}</h3>
                    <p className='text-gray-400 text-xs tracking-wide text-center'>{t.doctorPanelText}</p>
                </div>
            </div>

            {/* Testimonials */}
            <h1 className='mt-16 text-gray-200 text-lg font-light tracking-wide'>{t.impactTitle}</h1>
            <div className='text-gray-300 text-xs mt-3 w-full flex flex-col gap-2 text-center max-w-[500px]'>
                {t.impactPoints.map((point, idx) => (
                    <p key={idx} className='bg-primary/40 py-3 rounded-full'>{point}</p>
                ))}
            </div>

            {/* future section */}
            <h1 className='mt-16 text-gray-200 text-lg font-light tracking-wide'>{t.futureTitle}</h1>
            <div className='text-gray-400 text-xs mt-3 w-full flex flex-col gap-2 text-center max-w-[500px] mb-16 whitespace-pre-line'>
                <p>{t.futureText}</p>
            </div>
        </div>
    )
}

export default About;
