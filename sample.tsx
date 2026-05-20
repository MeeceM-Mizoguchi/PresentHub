<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meece - AI開発ラボ プレゼンテーション 2026</title>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html, body {
            width: 100%;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: 'Noto Sans JP', 'Poppins', sans-serif;
            background: linear-gradient(135deg, #f5f5f5 0%, #ebebeb 100%);
            padding: 20px;
        }

        /* ===== ページ共通 ===== */
        .page {
            width: 297mm;
            height: 210mm;
            margin: 20px auto;
            background: white;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            position: relative;
            overflow: hidden;
            page-break-after: always;
        }

        /* ===== カラーパレット ===== */
        :root {
            --meece-blue: #00E5FF;
            --meece-purple: #8B5CF6;
            --meece-pink: #FF5BAE;
            --slate-900: #0F172A;
            --slate-950: #020617;
            --accent-blue: #0052A3;
        }

        /* ===== ページ1: OPENING ===== */
        .title-page {
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #0052A3 0%, #0066CC 25%, #004D99 50%, #004080 75%, #003D7A 100%);
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: stretch;
            overflow: hidden;
        }

        .title-page::before {
            content: '';
            position: absolute;
            top: -80px;
            right: -120px;
            width: 500px;
            height: 500px;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%);
            border-radius: 50%;
            z-index: 1;
        }

        .title-page::after {
            content: '';
            position: absolute;
            bottom: -100px;
            left: -80px;
            width: 400px;
            height: 400px;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%);
            border-radius: 50%;
            z-index: 1;
        }

        .title-left {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 40px 50px;
            position: relative;
            z-index: 2;
            color: white;
        }

        .title-tagline {
            text-align: right;
            font-size: 11px;
            font-weight: 400;
            line-height: 1.8;
            letter-spacing: 0.5px;
            opacity: 0.85;
            writing-mode: vertical-rl;
            transform: rotate(180deg);
        }

        .title-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 20px;
        }

        .title-content h1 {
            font-size: 70px;
            font-weight: 900;
            line-height: 1.1;
            margin: 0;
            letter-spacing: -1.5px;
            text-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        .title-accent-line {
            width: 100px;
            height: 4px;
            background: white;
            opacity: 0.8;
        }

        .title-footer {
            font-size: 10px;
            letter-spacing: 1.5px;
            opacity: 0.65;
            text-transform: uppercase;
            font-weight: 500;
        }

        .title-right {
            flex: 0 0 38%;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(255, 255, 255, 0.93) 100%);
            backdrop-filter: blur(20px);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 30px;
            padding: 40px 40px;
            position: relative;
            z-index: 2;
            box-shadow: inset -20px 0 40px rgba(0, 0, 0, 0.03);
        }

        .logo-container {
            text-align: center;
        }

        .logo-box {
            font-size: 24px;
            font-weight: 900;
            color: #0052A3;
            letter-spacing: 2px;
            padding: 20px 40px;
            border: 3px solid #0052A3;
            display: inline-block;
            background: white;
            backdrop-filter: blur(10px);
        }

        .logo-message {
            margin-top: 20px;
            font-size: 11px;
            color: #333;
            letter-spacing: 0.3px;
            font-weight: 500;
            line-height: 1.6;
        }

        .tagline-block {
            text-align: center;
            padding: 18px;
            background: linear-gradient(135deg, #0052A3, #0066CC);
            color: white;
            border-radius: 3px;
            width: 100%;
        }

        .tagline-block p {
            font-size: 11px;
            letter-spacing: 0.3px;
            font-weight: 500;
            margin: 0;
            line-height: 1.6;
        }

        /* ===== 通常コンテンツページ共通 ===== */
        .content-page {
            width: 100%;
            height: 100%;
            background: white;
            padding: 30px 45px;
            display: flex;
            flex-direction: column;
            position: relative;
            overflow: hidden;
        }

        .content-page.dark-bg {
            background: linear-gradient(145deg, #020617 0%, #0f172a 100%);
            color: white;
        }

        .page-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 3px solid var(--accent-blue);
            position: relative;
            z-index: 2;
        }

        .content-page.dark-bg .page-header {
            border-bottom-color: var(--meece-blue);
        }

        .page-header h2 {
            font-size: 36px;
            font-weight: 900;
            color: var(--accent-blue);
            margin: 0;
            letter-spacing: -0.5px;
        }

        .content-page.dark-bg .page-header h2 {
            color: var(--meece-blue);
        }

        .page-number {
            font-size: 10px;
            color: #999;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .content-page.dark-bg .page-number {
            color: #666;
        }

        .content-wrapper {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 20px 0;
            overflow: hidden;
        }

        .content-wrapper::-webkit-scrollbar {
            width: 6px;
        }

        .content-wrapper::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
        }

        .content-wrapper::-webkit-scrollbar-thumb {
            background: #ccc;
            border-radius: 10px;
        }

        .content-block {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .content-block h3 {
            font-size: 20px;
            font-weight: 700;
            color: var(--accent-blue);
            letter-spacing: 0.8px;
            text-transform: uppercase;
            margin-bottom: 10px;
        }

        .content-page.dark-bg .content-block h3 {
            color: var(--meece-blue);
        }

        .content-block p {
            font-size: 15px;
            line-height: 1.6;
            color: #555;
            font-weight: 400;
            margin: 0;
        }

        .content-page.dark-bg .content-block p {
            color: #aaa;
        }

        /* ===== 企業情報テーブル ===== */
        .company-info {
            background: linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%);
            padding: 30px;
            border-left: 3px solid var(--accent-blue);
            border-radius: 3px;
        }

        .info-row {
            display: flex;
            justify-content: space-between;
            padding: 20px 0;
            border-bottom: 1px solid rgba(0, 82, 163, 0.1);
            font-size: 16px;
        }

        .info-label {
            font-weight: 600;
            color: var(--accent-blue);
            text-transform: uppercase;
            letter-spacing: 0.4px;
            flex: 0 0 160px;
        }

        .info-row:last-child {
            border-bottom: none;
        }

        .info-label {
            font-weight: 600;
            color: var(--accent-blue);
            text-transform: uppercase;
            letter-spacing: 0.4px;
            flex: 0 0 130px;
        }

        .info-value {
            color: #333;
            font-weight: 500;
            flex: 1;
            text-align: right;
        }

        /* ===== ミッション・ビジョン ===== */
        .mission-vision {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
        }

        .mission-card {
            background: linear-gradient(135deg, var(--accent-blue) 0%, #0066CC 100%);
            color: white;
            padding: 18px;
            border-radius: 3px;
        }

        .mission-card h4 {
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.6px;
            margin: 0 0 8px 0;
            color: rgba(255, 255, 255, 0.9);
        }

        .mission-card p {
            font-size: 12px;
            line-height: 1.6;
            color: rgba(255, 255, 255, 0.95);
            margin: 0;
        }

        /* ===== リストスタイル ===== */
        .feature-list {
            display: flex;
            flex-direction: column;
            gap: 7px;
        }

        .feature-item {
            display: flex;
            gap: 10px;
            align-items: flex-start;
            font-size: 12px;
            line-height: 1.55;
            color: #555;
        }

        .content-page.dark-bg .feature-item {
            color: #aaa;
        }

        .feature-item::before {
            content: '';
            width: 5px;
            height: 5px;
            background: var(--accent-blue);
            border-radius: 50%;
            margin-top: 6px;
            flex-shrink: 0;
        }

        .content-page.dark-bg .feature-item::before {
            background: var(--meece-blue);
        }

        /* ===== グリッドレイアウト ===== */
        .grid-2col {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }

        .grid-3col {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
        }

        .grid-5col {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 10px;
        }

        /* ===== カード共通スタイル ===== */
        .card {
            background: #f8f9fa;
            padding: 25px;
            border-radius: 4px;
            border-left: 3px solid var(--accent-blue);
            transition: all 0.3s ease;
            animation: fadeInUp 0.6s ease-out;
            height: 100%;
        }

        .card h4 {
            font-size: 18px;
            font-weight: 700;
            color: var(--accent-blue);
            margin: 0 0 10px 0;
        }

        .card:hover {
            background: #f0f4ff;
            box-shadow: 0 4px 12px rgba(0, 82, 163, 0.1);
        }

        .content-page.dark-bg .card {
            background: rgba(255, 255, 255, 0.05);
            border-left-color: var(--meece-blue);
        }

        .content-page.dark-bg .card:hover {
            background: rgba(255, 255, 255, 0.08);
        }

        .card h4 {
            font-size: 22px;
            font-weight: 700;
            color: var(--accent-blue);
            margin: 0 0 15px 0;
        }

        .content-page.dark-bg .card h4 {
            color: var(--meece-blue);
        }

        .card p {
            font-size: 11px;
            line-height: 1.55;
            color: #666;
            margin: 0;
        }

        .content-page.dark-bg .card p {
            color: #999;
        }

        /* ===== バッジ ===== */
        .badge {
            display: inline-block;
            padding: 4px 10px;
            background: var(--accent-blue);
            color: white;
            font-size: 9px;
            font-weight: 700;
            text-transform: uppercase;
            border-radius: 2px;
            letter-spacing: 0.3px;
            margin-bottom: 8px;
        }

        .badge.cyan {
            background: var(--meece-blue);
        }

        .badge.purple {
            background: var(--meece-purple);
        }

        .badge.pink {
            background: var(--meece-pink);
        }

        /* ===== フェーズバッジ ===== */
        .phase-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 8px 12px;
            background: rgba(139, 92, 246, 0.1);
            border: 1px solid var(--meece-purple);
            border-radius: 3px;
            font-size: 11px;
            font-weight: 600;
            color: var(--meece-purple);
            margin-bottom: 12px;
        }

        .phase-badge.cyan {
            background: rgba(0, 229, 255, 0.1);
            border-color: var(--meece-blue);
            color: var(--meece-blue);
        }

        /* ===== タイムライン ===== */
        .timeline {
            display: flex;
            gap: 15px;
            align-items: center;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 4px;
            font-size: 11px;
        }

        .content-page.dark-bg .timeline {
            background: rgba(255, 255, 255, 0.05);
        }

        .timeline-item {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .timeline-dot {
            width: 8px;
            height: 8px;
            background: var(--accent-blue);
            border-radius: 50%;
            flex-shrink: 0;
        }

        .timeline-dot.active {
            width: 12px;
            height: 12px;
            background: var(--meece-blue);
            box-shadow: 0 0 8px var(--meece-blue);
        }

        .timeline-arrow {
            color: #999;
            font-size: 14px;
            font-weight: bold;
        }

        /* ===== インフォグラフィック ===== */
        .infographic {
            display: flex;
            align-items: center;
            justify-content: space-around;
            gap: 20px;
            padding: 20px;
            background: linear-gradient(135deg, #f8f9fa 0%, #f0f4ff 100%);
            border-radius: 4px;
            min-height: 120px;
        }

        .content-page.dark-bg .infographic {
            background: rgba(139, 92, 246, 0.05);
        }

        .info-box {
            text-align: center;
            flex: 1;
        }

        .info-number {
            font-size: 32px;
            font-weight: 900;
            color: var(--accent-blue);
            line-height: 1;
            margin-bottom: 5px;
        }

        .content-page.dark-bg .info-number {
            color: var(--meece-blue);
        }

        .info-label {
            font-size: 11px;
            color: #666;
            font-weight: 500;
        }

        .content-page.dark-bg .info-label {
            color: #999;
        }

        /* ===== 比較チャート ===== */
        .comparison-row {
            display: grid;
            grid-template-columns: 200px 1fr 1fr;
            gap: 20px;
            align-items: center;
            padding: 15px 0;
            border-bottom: 1px solid #eee;
        }

        .content-page.dark-bg .comparison-row {
            border-bottom-color: rgba(255, 255, 255, 0.1);
        }

        .comparison-label {
            font-size: 12px;
            font-weight: 600;
            color: var(--accent-blue);
        }

        .content-page.dark-bg .comparison-label {
            color: var(--meece-blue);
        }

        .progress-bar {
            height: 24px;
            background: #e0e0e0;
            border-radius: 2px;
            overflow: hidden;
            position: relative;
            font-size: 10px;
            display: flex;
            align-items: center;
            padding: 0 8px;
            color: #666;
        }

        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, var(--accent-blue), #0066CC);
            border-radius: 2px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 600;
            transition: width 0.3s ease;
        }

        /* ===== アニメーション ===== */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes pulse {
            0%, 100% {
                opacity: 1;
            }
            50% {
                opacity: 0.5;
            }
        }

        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        .content-block {
            animation: fadeInUp 0.6s ease-out;
        }

        .card {
            animation: fadeInUp 0.6s ease-out;
        }

        /* CSS Rocket Illustration */
        .rocket-container {
            position: relative;
            width: 120px;
            height: 120px;
            transform: rotate(45deg);
            filter: drop-shadow(0 0 15px rgba(0, 229, 255, 0.6));
        }

        .rocket-body {
            position: absolute;
            top: 20%;
            left: 35%;
            width: 30%;
            height: 60%;
            background: linear-gradient(to right, #ffffff, #e2e8f0);
            border-radius: 50% 50% 20% 20%;
        }

        .rocket-nose {
            position: absolute;
            top: -10%;
            left: 0;
            width: 100%;
            height: 40%;
            background: #ff5bae;
            border-radius: 50% 50% 0 0;
        }

        .rocket-window {
            position: absolute;
            top: 35%;
            left: 25%;
            width: 50%;
            height: 25%;
            background: #00e5ff;
            border: 3px solid #64748b;
            border-radius: 50%;
        }

        .rocket-fin-l, .rocket-fin-r {
            position: absolute;
            bottom: 10%;
            width: 30%;
            height: 35%;
            background: #ff5bae;
            z-index: -1;
        }

        .rocket-fin-l {
            left: -20%;
            border-radius: 100% 0 0 20%;
        }

        .rocket-fin-r {
            right: -20%;
            border-radius: 0 100% 20% 0%;
        }

        .rocket-fire {
            position: absolute;
            bottom: -25%;
            left: 25%;
            width: 50%;
            height: 30%;
            background: linear-gradient(to bottom, #ff9d00, transparent);
            border-radius: 0 0 50% 50%;
            animation: pulse 0.2s infinite;
        }

        /* Error UI Components */
        .alert-bar {
            width: 100%;
            height: 60px;
            background: rgba(239, 68, 68, 0.1);
            border: 2px solid #ef4444;
            border-radius: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
            box-shadow: 0 0 20px rgba(239, 68, 68, 0.2);
        }

        .alert-fill {
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 65%;
            background: linear-gradient(90deg, #ef4444, #b91c1c);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-family: 'Poppins';
            font-weight: 800;
            letter-spacing: 2px;
        }

        .alert-text {
            flex: 1;
            text-align: right;
            padding-right: 40px;
            color: #ef4444;
            font-family: 'Poppins';
            font-weight: 700;
            font-size: 14px;
            letter-spacing: 3px;
        }

        .error-card {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            padding: 30px;
            position: relative;
            transition: all 0.3s ease;
        }

        .error-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            border-radius: 8px 8px 0 0;
        }

        .error-label {
            font-family: 'Poppins';
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 1px;
            margin-bottom: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        /* Velocity UI Components */
        .velocity-container {
            display: flex;
            gap: 40px;
            align-items: stretch;
            flex: 1;
        }

        .reduction-box {
            flex: 0 0 320px;
            background: #f8fafc;
            border-radius: 12px;
            padding: 40px 30px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            border: 1px solid #e2e8f0;
        }

        .velocity-charts {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 15px;
        }

        .summary-banner {
            width: 100%;
            background: #0f172a;
            border-radius: 12px;
            padding: 25px 40px;
            color: white;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-shadow: 0 15px 30px rgba(15, 23, 42, 0.15);
        }

        .v-bar-container {
            background: #f1f5f9;
            height: 35px;
            border-radius: 4px;
            overflow: hidden;
            position: relative;
            display: flex;
            align-items: center;
        }

        .v-bar-label {
            position: absolute;
            left: 15px;
            font-size: 12px;
            font-weight: 700;
            color: #475569;
            z-index: 1;
        }

        .v-bar-fill-base {
            height: 100%;
            background: #cbd5e1;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding-right: 15px;
            color: white;
            font-size: 11px;
            font-weight: 700;
        }

        .v-bar-fill-meece {
            height: 100%;
            background: linear-gradient(90deg, #00e5ff, #0052a3);
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding-right: 15px;
            color: white;
            font-size: 11px;
            font-weight: 700;
            box-shadow: 4px 0 10px rgba(0, 229, 255, 0.3);
        }

        /* Success Story UI Components */
        .story-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin: 20px 0;
        }

        .story-card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 15px;
            padding: 30px;
            position: relative;
            display: flex;
            flex-direction: column;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.03);
        }

        .story-card-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .story-badge {
            font-size: 10px;
            font-weight: 700;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 1px;
            background: #f1f5f9;
            padding: 4px 12px;
            border-radius: 4px;
        }

        .story-title {
            font-size: 26px;
            font-weight: 800;
            color: #0f172a;
            line-height: 1.3;
            margin-bottom: 15px;
        }

        .story-desc {
            font-size: 15px;
            color: #475569;
            line-height: 1.7;
            margin-bottom: 25px;
            flex-grow: 1;
        }

        .metric-footer {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            padding-top: 20px;
            border-top: 1px solid #f1f5f9;
        }

        .metric-item {
            text-align: center;
            padding: 10px;
            background: #f8fafc;
            border-radius: 8px;
        }

        .metric-label {
            font-size: 9px;
            font-weight: 700;
            color: #94a3b8;
            text-transform: uppercase;
            margin-bottom: 5px;
        }

        .metric-value {
            font-size: 18px;
            font-weight: 800;
            color: #0052a3;
        }

        .success-accent-footer {
            background: #f8faff;
            border-radius: 12px;
            padding: 25px 35px;
            border-left: 5px solid #0052a3;
            margin-top: 10px;
        }

        /* ===== PDF印刷用スタイル ===== */
        @media print {
            body {
                background-color: white;
                margin: 0;
                padding: 0;
            }

            .page {
                width: 297mm;
                height: 210mm;
                margin: 0;
                padding: 0;
                box-shadow: none;
                page-break-after: always;
            }

            .page:last-child {
                page-break-after: avoid;
            }

            @page {
                size: A4 landscape;
                margin: 0;
            }
        }
    </style>
</head>
<body>
    <!-- ===== ページ1: OPENING ===== -->
    <div class="page" data-slide="1">
        <div class="title-page">
            <div class="title-left">
                <div class="title-tagline">
                    時代をまたぎ、<br>
                    新しいデジタルを<br>
                    デザインする。
                </div>

                <div class="title-content">
                    <h1>DIGITAL<br>CREATIVE<br>FIRM</h1>
                    <div class="title-accent-line"></div>
                </div>

                <div class="title-footer">INNOVATION GUIDE 2026</div>
            </div>

            <div class="title-right">
                <div class="logo-container">
                    <div class="logo-box">MEECE</div>
                    <div class="logo-message">テクノロジーと表現で、<br>価値を再定義する。</div>
                </div>

                <div class="tagline-block">
                    <p>すべてのビジネスに、<br>輝く「物語」の続きを。</p>
                </div>
            </div>
        </div>
    </div>

    <!-- ===== ページ2: Corporate Profile ===== -->
    <div class="page" data-slide="2">
        <div class="content-page">
            <div class="page-header">
                <h2>CORPORATE PROFILE</h2>
                <span class="page-number">Page 2</span>
            </div>

            <div class="content-wrapper">
                <div class="content-block">
                    <h3>会社概要</h3>
                    <div class="company-info">
                        <div style="display: flex; gap: 40px;">
                            <div style="flex: 1;">
                                <div class="info-row"><span class="info-label">商号</span><span class="info-value">Meece株式会社</span></div>
                                <div class="info-row"><span class="info-label">代表取締役</span><span class="info-value">溝口雅登</span></div>
                                <div class="info-row"><span class="info-label">設立</span><span class="info-value">2022年8月22日</span></div>
                            </div>
                            <div style="flex: 1;">
                                <div class="info-row"><span class="info-label">資本金</span><span class="info-value">1,000,000円</span></div>
                                <div class="info-row"><span class="info-label">取引銀行</span><span class="info-value">みずほ銀行</span></div>
                                <div class="info-row"><span class="info-label">Email</span><span class="info-value">info@meece.io</span></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="content-block">
                    <h3>所在地・連絡先</h3>
                    <div style="display: flex; gap: 20px;">
                        <div class="card" style="flex: 1;">
                            <h4>本社所在地</h4>
                            <p>〒100-0005 東京都千代田区丸の内1-8-3<br>丸の内トラストタワー本館 20階</p>
                        </div>
                        <div class="card" style="flex: 1;">
                            <h4>連絡先</h4>
                            <p>TEL: 03-5288-5125<br>受付時間: 平日 10:00 - 19:00</p>
                        </div>
                    </div>
                </div>

                <div class="content-block">
                    <h3>事業内容</h3>
                    <div style="display: flex; gap: 20px;">
                        <div class="card" style="flex: 1;">
                            <h4>AI受託開発・DX支援</h4>
                            <p>独自のAIエンジンを活用したプロトタイピング、業務効率化システムの構築、DXコンサルティングを提供。</p>
                        </div>
                        <div class="card" style="flex: 1;">
                            <h4>多角的事業支援</h4>
                            <p>SES事業で培った現場知見を活かし、製造・教育・医療など多岐にわたるドメインのIT化を支援。</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- ===== ページ3: Roots & History ===== -->
    <div class="page" data-slide="3">
        <div class="content-page">
            <div class="page-header">
                <h2>ROOTS & HISTORY</h2>
                <span class="page-number">Page 3</span>
            </div>

            <div class="content-wrapper">
                <div class="content-block" style="padding-bottom: 20px;">
                    <div class="phase-badge">PHASE 01</div>
                    <h3>2022 - 2023: SES事業</h3>
                    <p>現場の熱量を、ITの歯車に変える。2022年の創業以来、私たちはSES事業を通じて、あらゆる産業の「最前線」に身を置いてきました。机上の空論ではなく、現場の痛みを知るからこそ、真に動くシステムが創れると信じています。</p>
                </div>

                <div class="content-block" style="flex: 1; display: flex; flex-direction: column;">
                    <h3 style="margin-bottom: 20px;">5つの主要ドメイン</h3>
                    <div class="grid-5col" style="flex: 1; gap: 12px;">
                        <div class="card" style="display: flex; flex-direction: column; justify-content: center; padding: 25px 15px;">
                            <h4 style="font-size: 32px; margin-bottom: 10px;">M</h4>
                            <p style="font-size: 14px; font-weight: 700; color: var(--accent-blue); margin-bottom: 10px;">Manufacturing</p>
                            <p style="font-size: 12px; line-height: 1.5;">技術継承や生産ラインを効率化。工場の「止まらない物語」をデジタル支援。</p>
                        </div>
                        <div class="card" style="display: flex; flex-direction: column; justify-content: center; padding: 25px 15px;">
                            <h4 style="font-size: 32px; margin-bottom: 10px;">E</h4>
                            <p style="font-size: 14px; font-weight: 700; color: var(--accent-blue); margin-bottom: 10px;">Education</p>
                            <p style="font-size: 12px; line-height: 1.5;">知識共有を民主化。誰もが最高の教育を享受できる環境をITで構築。</p>
                        </div>
                        <div class="card" style="display: flex; flex-direction: column; justify-content: center; padding: 25px 15px;">
                            <h4 style="font-size: 32px; margin-bottom: 10px;">E</h4>
                            <p style="font-size: 14px; font-weight: 700; color: var(--accent-blue); margin-bottom: 10px;">Entertainment</p>
                            <p style="font-size: 12px; line-height: 1.5;">感動を実装。最新技術で人々の心を動かす新しい「体験」を創造。</p>
                        </div>
                        <div class="card" style="display: flex; flex-direction: column; justify-content: center; padding: 25px 15px;">
                            <h4 style="font-size: 32px; margin-bottom: 10px;">C</h4>
                            <p style="font-size: 14px; font-weight: 700; color: var(--accent-blue); margin-bottom: 10px;">Commerce</p>
                            <p style="font-size: 12px; line-height: 1.5;">複雑な物流やトレンドを最適化。店舗とユーザーを繋ぐ流通を実装。</p>
                        </div>
                        <div class="card" style="display: flex; flex-direction: column; justify-content: center; padding: 25px 15px;">
                            <h4 style="font-size: 32px; margin-bottom: 10px;">E</h4>
                            <p style="font-size: 14px; font-weight: 700; color: var(--accent-blue); margin-bottom: 10px;">Everyday life</p>
                            <p style="font-size: 12px; line-height: 1.5;">医療・行政・インフラ。日常の当たり前をより便利で安心なものへ刷新。</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- ===== ページ4: R&D Silent Evolution ===== -->
    <div class="page" data-slide="4">
        <div class="content-page">
            <div class="page-header">
                <h2>R&D SILENT EVOLUTION</h2>
                <span class="page-number">Page 4</span>
            </div>

            <div class="content-wrapper">
                <div class="content-block">
                    <div class="phase-badge" style="background: #8b5cf6; color: #ffffff; font-weight: 800; padding: 4px 12px; border-radius: 2px; display: inline-block; margin-bottom: 15px;">PHASE 02</div>
                    <h3 style="color: #8b5cf6; margin-top: 5px;">2024 - 2025: 知能を研鑽し、エンジンを創る</h3>
                    <p>現場の課題解決を続ける一方で、私たちは2024年にAI研究開発部門を設立しました。受託開発の常識を覆すための「独自の開発基盤」を磨き上げてきた期間です。</p>
                </div>

                <div class="content-block" style="background: #f8f9fa; padding: 30px; border-radius: 8px;">
                    <div class="timeline-simple" style="display: flex; align-items: center; justify-content: space-around; font-size: 16px; font-weight: 600;">
                        <span>● 2022-23</span> <span style="color: #ccc;">➔</span>
                        <span style="color: var(--accent-blue);">● SES事業</span> <span style="color: #ccc;">➔</span>
                        <span>● 2024-25</span> <span style="color: #ccc;">➔</span>
                        <span style="color: #a855f7;">● AI R&D</span> <span style="color: #ccc;">➔</span>
                        <span style="color: #06b6d4;">● 2026</span> <span style="color: #ccc;">➔</span>
                        <span style="color: #06b6d4;">● ラボ始動</span>
                    </div>
                </div>

                <div class="content-block">
                    <h3 style="margin-bottom: 20px;">3つの研究柱</h3>
                    <div class="grid-3col" style="gap: 20px;">
                        <div class="card" style="padding: 30px;">
                            <h4 style="font-size: 20px;">AI Architecture</h4>
                            <p style="font-size: 15px;">開発プロセス自体を自動化・高度化する独自のAIアーキテクチャの研究。</p>
                        </div>
                        <div class="card" style="padding: 30px;">
                            <h4 style="font-size: 20px;">Hybrid Workflow</h4>
                            <p style="font-size: 15px;">AIのスピードと人間のプロ品質を融合させる、手戻りゼロのワークフロー構築。</p>
                        </div>
                        <div class="card" style="padding: 30px;">
                            <h4 style="font-size: 20px;">Data Insight</h4>
                            <p style="font-size: 15px;">創業から蓄積した多角的ドメインの知見を学習データ化し、即応能力を獲得。</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- ===== ページ5: AI開発ラボ イントロ ===== -->
    <div class="page" data-slide="5">
        <div class="content-page dark-bg" style="background: radial-gradient(circle at 50% 50%, #111827 0%, #020617 100%); display: flex; flex-direction: column;">
            <div class="page-header">
                <h2>AI LAB LAUNCH</h2>
                <span class="page-number">Page 5</span>
            </div>

            <div class="content-wrapper" style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; padding: 20px 0 40px;">
                
                <div class="content-block" style="text-align: center; animation: slideInLeft 0.8s ease-out;">
                    <div class="phase-badge" style="background: #00e5ff; color: #020617; font-weight: 800; padding: 6px 20px; border-radius: 50px; display: inline-block; margin-bottom: 20px; box-shadow: 0 0 20px rgba(0, 229, 255, 0.4); font-size: 13px;">⚡ PHASE 03</div>
                    <h3 style="color: #ffffff; font-size: 40px; letter-spacing: 1.5px; margin-bottom: 10px;">2026: AI開発ラボ、始動。</h3>
                    <p style="font-size: 19px; color: #94a3b8; max-width: 900px; margin: 0 auto;">独自のAI駆動エンジンにより、アイディアを短時間で「動く資産」へと変換。</p>
                </div>

                <div style="position: relative; height: 550px; display: flex; align-items: center; justify-content: center; margin: 20px 0;">
                    
                    <div style="position: absolute; width: 380px; height: 380px; border: 2px solid rgba(0, 229, 255, 0.2); border-radius: 50%; animation: pulse 3s infinite;"></div>
                    <div style="position: absolute; width: 520px; height: 520px; border: 1px solid rgba(0, 229, 255, 0.1); border-radius: 50%;"></div>

                    <div style="width: 180px; height: 180px; background: rgba(0, 229, 255, 0.1); border: 3px solid #00e5ff; border-radius: 50%; display: flex; align-items: center; justify-content: center; z-index: 2; box-shadow: 0 0 50px rgba(0, 229, 255, 0.3);">
                        <div class="rocket-container">
                            <div class="rocket-body">
                                <div class="rocket-nose"></div>
                                <div class="rocket-window"></div>
                                <div class="rocket-fin-l"></div>
                                <div class="rocket-fin-r"></div>
                                <div class="rocket-fire"></div>
                            </div>
                        </div>
                    </div>

                    <div style="position: absolute; width: 100%; height: 100%; display: flex; justify-content: space-between; align-items: center; padding: 0 80px;">
                        <div style="flex: 1; text-align: right; padding-right: 70px; position: relative; max-width: 400px;">
                            <h4 style="font-size: 30px; color: #00e5ff; margin-bottom: 12px; font-weight: 800; letter-spacing: 1px;">ラボ設立の意義</h4>
                            <p style="font-size: 18px; color: #cbd5e1; line-height: 1.6;">現場知見を学習データ化し、<br>迅速な検証基盤を構築。</p>
                            <div style="position: absolute; top: 30px; right: 0; width: 50px; height: 2px; background: #00e5ff;"></div>
                        </div>

                        <div style="flex: 1; text-align: left; padding-left: 70px; position: relative; max-width: 400px;">
                            <h4 style="font-size: 30px; color: #00e5ff; margin-bottom: 12px; font-weight: 800; letter-spacing: 1px;">即時実行</h4>
                            <p style="font-size: 18px; color: #cbd5e1; line-height: 1.6;">アイディアを即座に変換し、<br>意思決定の速度を劇的に向上。</p>
                            <div style="position: absolute; top: 30px; left: 0; width: 50px; height: 2px; background: #00e5ff;"></div>
                        </div>
                    </div>

                    <div style="position: absolute; bottom: 60px; text-align: center; width: 100%;">
                        <div style="width: 2px; height: 60px; background: linear-gradient(180deg, #00e5ff, transparent); margin: 0 auto 15px;"></div>
                        <h4 style="font-size: 30px; color: #00e5ff; margin-bottom: 8px; font-weight: 800; letter-spacing: 1px;">エンジン投資</h4>
                        <p style="font-size: 18px; color: #cbd5e1;">次世代エンジンへ2年間の研究投資。</p>
                    </div>
                </div>

                <div style="padding: 0 100px;">
                    <div style="height: 10px; background: rgba(255, 255, 255, 0.08); border-radius: 10px; position: relative; display: flex; justify-content: space-between; align-items: center;">
                        <div style="position: absolute; height: 100%; width: 100%; background: linear-gradient(90deg, transparent 0%, #00e5ff 100%); border-radius: 10px; opacity: 0.8;"></div>
                        
                        <div style="z-index: 1; text-align: center; transform: translateY(-40px);">
                            <div style="width: 12px; height: 12px; background: #0f172a; border: 2px solid #475569; border-radius: 50%; margin: 0 auto 8px;"></div>
                            <span style="font-size: 13px; color: #64748b; font-weight: 600;">2022-23: SES</span>
                        </div>
                        <div style="z-index: 1; text-align: center; transform: translateY(-40px);">
                            <div style="width: 12px; height: 12px; background: #0f172a; border: 2px solid #475569; border-radius: 50%; margin: 0 auto 8px;"></div>
                            <span style="font-size: 13px; color: #64748b; font-weight: 600;">2024-25: R&D</span>
                        </div>
                        <div style="z-index: 1; text-align: center; transform: translateY(-40px);">
                            <div style="width: 20px; height: 20px; background: #00e5ff; border: 4px solid rgba(0, 229, 255, 0.3); border-radius: 50%; margin: 0 auto 8px; box-shadow: 0 0 15px #00e5ff;"></div>
                            <span style="display: block; font-size: 28px; color: #00e5ff; font-weight: 900; line-height: 1; text-shadow: 0 0 12px rgba(0, 229, 255, 0.8);">2026</span>
                            <span style="display: block; font-size: 11px; color: #00e5ff; font-weight: 700; letter-spacing: 1px; margin-top: 3px;">AI LAB</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- ===== ページ6: AI開発ラボ 実行フェーズ ===== -->
    <div class="page" data-slide="6">
        <div class="content-page">
            <div class="page-header">
                <h2>AI LAB EXECUTION</h2>
                <span class="page-number">Page 6</span>
            </div>

            <div class="content-wrapper" style="justify-content: space-between; padding: 20px 0;">
                <div class="content-block">
                    <h3>AI開発ラボ、実行フェーズへ。</h3>
                    <p style="font-size: 18px;">研究開発の成果を実際の事業価値に変える段階です。アイディアからプロトタイプ、そして本実装へと加速させるフロー。</p>
                </div>

                <div style="display: flex; align-items: center; justify-content: center; gap: 0; padding: 40px 0; position: relative;">
                    <div style="position: absolute; top: 35%; left: 15%; right: 15%; height: 2px; background: linear-gradient(90deg, #e2e8f0, var(--accent-blue), #e2e8f0); z-index: 0;"></div>

                    <div style="flex: 1; text-align: center; z-index: 1;">
                        <div style="width: 100px; height: 100px; background: white; border: 3px solid #e2e8f0; border-radius: 20px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; box-shadow: 0 10px 20px rgba(0,0,0,0.05); font-size: 40px;">📥</div>
                        <h4 style="font-size: 18px; color: var(--accent-blue); font-weight: 800; margin-bottom: 10px;">INPUT</h4>
                        <p style="font-size: 14px; color: #666; line-height: 1.5;">ユーザーボイス<br>チャット・メモ</p>
                    </div>

                    <div style="flex: 1; text-align: center; z-index: 1;">
                        <div style="width: 120px; height: 120px; background: linear-gradient(135deg, var(--accent-blue), #0066CC); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; box-shadow: 0 15px 30px rgba(0, 82, 163, 0.2); font-size: 50px; position: relative;">
                            <span style="animation: pulse 2s infinite;">⚙️</span>
                        </div>
                        <h4 style="font-size: 20px; color: var(--accent-blue); font-weight: 800; margin-bottom: 10px;">PROCESS</h4>
                        <p style="font-size: 14px; color: #666; line-height: 1.5;">AI Dev Lab<br>独自変換エンジン</p>
                    </div>

                    <div style="flex: 1; text-align: center; z-index: 1;">
                        <div style="width: 100px; height: 100px; background: white; border: 3px solid #e2e8f0; border-radius: 20px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; box-shadow: 0 10px 20px rgba(0,0,0,0.05); font-size: 40px;">📤</div>
                        <h4 style="font-size: 18px; color: var(--accent-blue); font-weight: 800; margin-bottom: 10px;">OUTPUT</h4>
                        <p style="font-size: 14px; color: #666; line-height: 1.5;">動く<br>プロトタイプ</p>
                    </div>
                </div>

                <div class="content-block">
                    <h3 style="margin-bottom: 25px;">3つのアウトプット</h3>
                    <div class="grid-3col" style="gap: 25px; align-items: stretch;">
                        <div style="position: relative; padding: 30px; background: #f8f9ff; border-radius: 8px; border-top: 4px solid var(--meece-blue);">
                            <div style="position: absolute; top: -15px; left: 20px; font-size: 40px; font-weight: 900; color: rgba(0, 229, 255, 0.1); font-family: 'Poppins';">01</div>
                            <h4 style="font-size: 22px; color: var(--accent-blue); margin-bottom: 15px; font-weight: 800;">Live UI/UX</h4>
                            <p style="font-size: 15px; color: #555; line-height: 1.7;">静止画ではなく、実際に遷移し入力ができる高精細な画面を提供。ユーザー体験を即座に検証可能。</p>
                        </div>
                        <div style="position: relative; padding: 30px; background: #f8f9ff; border-radius: 8px; border-top: 4px solid var(--meece-purple);">
                            <div style="position: absolute; top: -15px; left: 20px; font-size: 40px; font-weight: 900; color: rgba(139, 92, 246, 0.1); font-family: 'Poppins';">02</div>
                            <h4 style="font-size: 22px; color: var(--accent-blue); margin-bottom: 15px; font-weight: 800;">Core Logic</h4>
                            <p style="font-size: 15px; color: #555; line-height: 1.7;">ログイン、データ保存、AI連携など、ビジネスの根幹となるロジックを実装。単なる見本で終わらない実用性。</p>
                        </div>
                        <div style="position: relative; padding: 30px; background: #f8f9ff; border-radius: 8px; border-top: 4px solid var(--meece-pink);">
                            <div style="position: absolute; top: -15px; left: 20px; font-size: 40px; font-weight: 900; color: rgba(255, 91, 174, 0.1); font-family: 'Poppins';">03</div>
                            <h4 style="font-size: 22px; color: var(--accent-blue); margin-bottom: 15px; font-weight: 800;">Cloud URL</h4>
                            <p style="font-size: 15px; color: #555; line-height: 1.7;">発行されたURLを叩くだけで、その場で社内共有やデモが可能な環境を構築。意思決定の場へ即座にデプロイ。</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- ===== ページ7: AIラボとは？ ===== -->
    <div class="page" data-slide="7">
        <div class="content-page dark-bg" style="background: radial-gradient(circle at 50% 20%, #1a2236 0%, #020617 100%);">
            <div class="page-header">
                <h2>WHAT IS AI LAB?</h2>
                <span class="page-number">Page 7</span>
            </div>

            <div class="content-wrapper" style="justify-content: space-between; padding: 10px 0 30px;">
                <div class="content-block" style="text-align: center;">
                    <h3 style="color: #00e5ff; font-size: 28px; margin-bottom: 15px;">予算ハードルの問題をAIラボにて解決</h3>
                    <p style="font-size: 19px; color: #cbd5e1; max-width: 1000px; margin: 0 auto; line-height: 1.7;">
                        AIラボは、従来の予算制約で実現が難しかった案件にも挑戦できる新しい開発アプローチです。<br>
                        動く価値を早期に示し、投資判断のスピードを圧倒的に高めます。
                    </p>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 30px; margin: 20px 0;">
                    <div style="text-align: center; padding: 40px 20px; background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.2); border-top: 5px solid #ef4444; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                        <div style="font-size: 50px; margin-bottom: 20px; filter: drop-shadow(0 0 10px rgba(239, 68, 68, 0.5));">❌</div>
                        <h4 style="font-size: 24px; font-weight: 800; color: #ef4444; margin-bottom: 15px; letter-spacing: 1px;">PROBLEM</h4>
                        <p style="font-size: 16px; color: #94a3b8; line-height: 1.6;">着手できない案件が多い<br>高い初期費用がネック</p>
                    </div>
                    
                    <div style="text-align: center; padding: 40px 20px; background: rgba(0, 229, 255, 0.05); border: 1px solid rgba(0, 229, 255, 0.2); border-top: 5px solid #00e5ff; border-radius: 12px; box-shadow: 0 10px 40px rgba(0, 229, 255, 0.15); position: relative; transform: scale(1.05); z-index: 2;">
                        <div style="font-size: 50px; margin-bottom: 20px; filter: drop-shadow(0 0 15px #00e5ff);">🚀</div>
                        <h4 style="font-size: 24px; font-weight: 800; color: #00e5ff; margin-bottom: 15px; letter-spacing: 1px;">SOLUTION</h4>
                        <p style="font-size: 16px; color: #FFFFFF; line-height: 1.6; font-weight: 500;">AI開発ラボ<br>低予算で価値検証</p>
                    </div>

                    <div style="text-align: center; padding: 40px 20px; background: rgba(34, 197, 94, 0.05); border: 1px solid rgba(34, 197, 94, 0.2); border-top: 5px solid #22c55e; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                        <div style="font-size: 50px; margin-bottom: 20px; filter: drop-shadow(0 0 10px rgba(34, 197, 94, 0.5));">✅</div>
                        <h4 style="font-size: 24px; font-weight: 800; color: #22c55e; margin-bottom: 15px; letter-spacing: 1px;">RESULT</h4>
                        <p style="font-size: 16px; color: #94a3b8; line-height: 1.6;">動くプロトタイプ<br>事業仮説を可視化</p>
                    </div>
                </div>

                <div class="grid-3col" style="gap: 25px;">
                    <div class="card" style="padding: 35px; background: rgba(255, 255, 255, 0.03); border-left: 4px solid #00e5ff; display: flex; flex-direction: column; justify-content: center;">
                        <h4 style="font-size: 22px; color: #00e5ff; margin-bottom: 15px;">予算を再構築</h4>
                        <p style="font-size: 16px; color: #cbd5e1; line-height: 1.7;">低予算でも価値検証を実現し、これまで断念してきた案件を再起動します。</p>
                    </div>
                    <div class="card" style="padding: 35px; background: rgba(255, 255, 255, 0.03); border-left: 4px solid #8b5cf6; display: flex; flex-direction: column; justify-content: center;">
                        <h4 style="font-size: 22px; color: #8b5cf6; margin-bottom: 15px;">意思決定を加速</h4>
                        <p style="font-size: 16px; color: #cbd5e1; line-height: 1.7;">動くプロトタイプで事業仮説を可視化し、投資判断の速度を劇的に高めます。</p>
                    </div>
                    <div class="card" style="padding: 35px; background: rgba(255, 255, 255, 0.03); border-left: 4px solid #ff5bae; display: flex; flex-direction: column; justify-content: center;">
                        <h4 style="font-size: 22px; color: #ff5bae; margin-bottom: 15px;">次につながる知見</h4>
                        <p style="font-size: 16px; color: #cbd5e1; line-height: 1.7;">試作段階で得た発見をそのまま本実装につなげ、検証結果を確実に価値に変えます。</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- ===== ページ8: The Pain ===== -->
    <div class="page" data-slide="8">
        <div class="content-page">
            <div class="page-header">
                <h2 style="color: #dc2626;">THE PAIN</h2>
                <span class="page-number">Page 8</span>
            </div>

            <div class="content-wrapper" style="justify-content: space-between; padding: 20px 0 40px;">
                <div class="content-block" style="text-align: center;">
                    <p style="color: #ef4444; font-family: 'Poppins'; font-weight: 700; font-size: 14px; margin-bottom: 10px; letter-spacing: 1px;">CRITICAL SYSTEM STAGNATION REPORT</p>
                    <h3 style="color: #0f172a; font-size: 32px; margin-bottom: 15px;">開発の停滞がもたらす「見えない巨大な損失」</h3>
                    <p style="color: #475569; font-size: 18px; max-width: 900px; margin: 0 auto;">素晴らしいアイディアも、形にならなければ存在しないのと同じです。開発の遅延は競合に先を越される「機会損失」という致命的なダメージを与えています。</p>
                </div>

                <div class="alert-bar" style="background: #fee2e2; border-color: #ef4444;">
                    <div class="alert-fill" style="box-shadow: 5px 0 15px rgba(239, 68, 68, 0.3);">SYSTEM STAGNATION DETECTED . . .</div>
                    <div class="alert-text" style="color: #b91c1c;">65% LOSS</div>
                </div>

                <div class="grid-3col" style="gap: 25px; align-items: stretch;">
                    <div class="error-card" style="background: #fffafa; border-color: #fca5a5; border-top: 5px solid #ef4444; box-shadow: 0 10px 25px rgba(239, 68, 68, 0.08);">
                        <div class="error-label" style="color: #ef4444;">
                            <span style="font-weight: 800;">ERROR_01</span>
                            <span>⚠️</span>
                        </div>
                        <h4 style="font-size: 22px; color: #1e293b; margin-bottom: 15px; font-weight: 800;">エンジニアの不在</h4>
                        <p style="font-size: 15px; color: #64748b; line-height: 1.7;">採用難と離職の連鎖。開発チームが組めず、プロジェクトが着手すらできない絶望的な「待ち時間」。</p>
                    </div>

                    <div class="error-card" style="background: #fffcf5; border-color: #fcd34d; border-top: 5px solid #f59e0b; box-shadow: 0 10px 25px rgba(245, 158, 11, 0.08);">
                        <div class="error-label" style="color: #d97706;">
                            <span style="font-weight: 800;">ERROR_02</span>
                            <span>⚠️</span>
                        </div>
                        <h4 style="font-size: 22px; color: #1e293b; margin-bottom: 15px; font-weight: 800;">要件の空転（混迷）</h4>
                        <p style="font-size: 15px; color: #64748b; line-height: 1.7;">会議だけが繰り返され、要件が決まらない。1行のコードも書かれないまま、予算と時間が浪費される。</p>
                    </div>

                    <div class="error-card" style="background: #fefce8; border-color: #fde047; border-top: 5px solid #eab308; box-shadow: 0 10px 25px rgba(234, 179, 8, 0.08);">
                        <div class="error-label" style="color: #a16207;">
                            <span style="font-weight: 800;">ERROR_03</span>
                            <span>⚠️</span>
                        </div>
                        <h4 style="font-size: 22px; color: #1e293b; margin-bottom: 15px; font-weight: 800;">技術的負債の足枷</h4>
                        <p style="font-size: 15px; color: #64748b; line-height: 1.7;">古いシステムがブラックボックス化し、保守に追われ、攻めのIT投資が完全に停止してしまう。</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- ===== ページ9: Velocity（87.5%工期削減） ===== -->
    <div class="page" data-slide="9">
        <div class="content-page">
            <div class="page-header">
                <h2 style="color: var(--accent-blue);">VELOCITY</h2>
                <span class="page-number">Page 9</span>
            </div>

            <div class="content-wrapper" style="justify-content: space-between; padding: 10px 0 20px;">
                <div class="content-block" style="text-align: center; margin-bottom: 10px;">
                    <h3 style="color: #0f172a; font-size: 36px; margin-bottom: 5px;">従来比 87.5% の工期削減</h3>
                    <p style="font-size: 18px; color: #64748b;">最短24時間、最大でも2週間での実装力。開発の「単位」を根本から変えます。</p>
                </div>

                <div class="velocity-container">
                    <div class="reduction-box" style="text-align: center;">
                        <p style="font-family: 'Poppins'; font-size: 14px; font-weight: 700; color: #64748b; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 2px;">Reduction Rate</p>
                        <div style="font-size: 100px; font-weight: 900; color: #0f172a; line-height: 1; font-family: 'Poppins';">87.5<span style="font-size: 40px; margin-left: 5px;">%</span></div>
                        <p style="font-size: 13px; color: #94a3b8; margin-top: 20px; line-height: 1.6;">「基礎実装」「環境構築」をAIで完全自動化。<br>人間は「価値の本質」にのみ時間を投下できます。</p>
                    </div>

                    <div class="velocity-charts">
                        <div class="content-block">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase;">
                                <span>Project Phases</span>
                                <span>Conventional vs Meece</span>
                            </div>
                            
                            <div style="margin-bottom: 15px;">
                                <div class="v-bar-container" style="margin-bottom: 5px;"><span class="v-bar-label">要件定義・設計</span><div class="v-bar-fill-base" style="width: 100%;">従来：2週間</div></div>
                                <div class="v-bar-container"><div class="v-bar-fill-meece" style="width: 15%;">Meece：24時間</div></div>
                            </div>

                            <div style="margin-bottom: 15px;">
                                <div class="v-bar-container" style="margin-bottom: 5px;"><span class="v-bar-label">開発・実装</span><div class="v-bar-fill-base" style="width: 100%;">従来：5週間</div></div>
                                <div class="v-bar-container"><div class="v-bar-fill-meece" style="width: 14%;">Meece：5日間</div></div>
                            </div>

                            <div>
                                <div class="v-bar-container" style="margin-bottom: 5px;"><span class="v-bar-label">QA・テスト</span><div class="v-bar-fill-base" style="width: 100%;">従来：1週間</div></div>
                                <div class="v-bar-container"><div class="v-bar-fill-meece" style="width: 13%;">Meece：1日間</div></div>
                            </div>
                        </div>

                        <div class="summary-banner">
                            <div style="font-family: 'Poppins'; font-size: 12px; font-weight: 600; opacity: 0.6; text-transform: uppercase; letter-spacing: 1px;">Total Development Period</div>
                            <div style="display: flex; align-items: center; gap: 30px;">
                                <div style="text-align: center;"><span style="display: block; font-size: 28px; font-weight: 900; line-height: 1;">8</span><span style="font-size: 10px; opacity: 0.6; text-transform: uppercase;">Weeks</span></div>
                                <div style="font-size: 24px; color: #00e5ff;">➔</div>
                                <div style="text-align: center; color: #00e5ff;"><span style="display: block; font-size: 40px; font-weight: 900; line-height: 1;">1</span><span style="font-size: 12px; font-weight: 800; text-transform: uppercase;">Week</span></div>
                            </div>
                        </div>
                    </div>
                </div>

                <p style="font-size: 15px; color: #64748b; line-height: 1.6; padding-top: 15px; border-top: 1px solid #f1f5f9;">
                    なぜMeeceはこれほどまでに速いのか。その答えは、87.5%という数字に裏付けられています。従来の開発では、数週間かけていた要件定義や基礎実装を、私たちはAI駆動エンジンによって即座に完結。お客様が「すぐ試せる、すぐ動く」環境を、成功の連鎖を創り上げるために提供します。
                </p>
            </div>
        </div>
    </div>

    <!-- ===== ページ10: Outcome ===== -->
    <div class="page" data-slide="13">
        <div class="content-page">
            <div class="page-header">
                <h2 style="color: #0052a3;">Success Stories: Revolution 2026</h2>
                <span class="page-number">Page 13</span>
            </div>

            <div class="content-wrapper" style="justify-content: space-between; padding: 10px 0;">
                <div class="content-block">
                    <p style="font-size: 16px; color: #64748b;">AI開発ラボが実現した、圧倒的な実行スピードの証明。</p>
                </div>

                <div class="story-grid">
                    <div class="story-card" style="border-top: 6px solid #0052a3;">
                        <div class="story-card-top">
                            <span class="story-badge">CASE 01: MANUFACTURING DX</span>
                            <span style="font-size: 18px;">🏭</span>
                        </div>
                        <h3 class="story-title">老舗菓子店：<br>伝統をデジタルで守る。</h3>
                        <p class="story-desc">創業100年の熟練の勘をAIが継承。手書き伝票による月間160時間の事務工数を、わずか10日間の開発で自動化しました。</p>
                        <div class="metric-footer">
                            <div class="metric-item">
                                <p class="metric-label">Development</p>
                                <p class="metric-value">10 <span style="font-size: 12px;">DAYS</span></p>
                            </div>
                            <div class="metric-item">
                                <p class="metric-label">Cost Reduction</p>
                                <p class="metric-value" style="color: #16a34a;">~ 80% OFF</p>
                            </div>
                        </div>
                    </div>

                    <div class="story-card" style="border-top: 6px solid #1e293b;">
                        <div class="story-card-top">
                            <span class="story-badge">CASE 02: STARTUP PMF</span>
                            <span style="font-size: 18px;">🚀</span>
                        </div>
                        <h3 class="story-title">Fintechベンチャー：<br>14日間でPMF達成。</h3>
                        <p class="story-desc">他社で「半年」と言われたMVP開発を2週間で完遂。資金が底を突く前に市場検証を開始し、2ヶ月での追加調達に成功。</p>
                        <div class="metric-footer">
                            <div class="metric-item">
                                <p class="metric-label">MVP Launch</p>
                                <p class="metric-value">14 <span style="font-size: 12px;">DAYS</span></p>
                            </div>
                            <div class="metric-item">
                                <p class="metric-label">Validation</p>
                                <p class="metric-value" style="color: #0052a3;">✓ PMF VERIFIED</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="success-accent-footer">
                    <p style="font-size: 15px; line-height: 1.8; color: #1e293b;">
                        実績の第一歩は、ある老舗菓子店様の事例です。守るべき伝統があるからこそ、変えられない非効率な業務に苦しんでおられました。私たちは自らの知能を「盾」に、AIに学習させ、事務工数をわずか10日間で削減しました。結果として生まれた時間は、本来人間が割くべき「より付加価値の高い仕事」へ還元されています。デジタルは、伝統を守るための最良の盾になるのです。
                    </p>
                </div>
            </div>
        </div>
    </div>

    <!-- ===== ページ11: Methodology ===== -->
    <div class="page" data-slide="11">
        <div class="content-page">
            <div class="page-header">
                <h2>METHODOLOGY</h2>
                <span class="page-number">Page 11</span>
            </div>

            <div class="content-wrapper">
                <div class="content-block">
                    <h3>爆速を支える、堅牢なハイブリッド・フロー</h3>
                    <p>AIの機動力 × プロフェッショナルの審美眼</p>
                </div>

                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin: 20px 0;">
                    <div style="padding: 18px; background: linear-gradient(135deg, #f8f9fa 0%, #f0f4ff 100%); border-radius: 4px; border-left: 3px solid #0052A3; position: relative;">
                        <div style="position: absolute; top: 10px; right: 10px; width: 24px; height: 24px; background: #0052A3; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700;">①</div>
                        <h4 style="font-size: 11px; font-weight: 700; color: #999; text-transform: uppercase; letter-spacing: 0.3px; margin: 0 0 10px 0;">AI Rapid</h4>
                        <h3 style="font-size: 14px; font-weight: 700; color: #0052A3; margin: 0 0 8px 0;">AI駆動</h3>
                        <p style="font-size: 11px; line-height: 1.55; color: #666; margin: 0;">指示から数秒でプロトタイプを生成。視覚的な合意を最速で形成し、要件のズレを根絶。</p>
                    </div>

                    <div style="padding: 18px; background: linear-gradient(135deg, #f8f9fa 0%, #f0f4ff 100%); border-radius: 4px; border-left: 3px solid #0052A3; position: relative;">
                        <div style="position: absolute; top: 10px; right: 10px; width: 24px; height: 24px; background: #0052A3; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700;">②</div>
                        <h4 style="font-size: 11px; font-weight: 700; color: #999; text-transform: uppercase; letter-spacing: 0.3px; margin: 0 0 10px 0;">Human Polish</h4>
                        <h3 style="font-size: 14px; font-weight: 700; color: #0052A3; margin: 0 0 8px 0;">プロの調整</h3>
                        <p style="font-size: 11px; line-height: 1.55; color: #666; margin: 0;">熟練エンジニアが、アクセシビリティ、セキュリティ、パフォーマンスを精査・最適化。</p>
                    </div>

                    <div style="padding: 18px; background: linear-gradient(135deg, #f8f9fa 0%, #f0f4ff 100%); border-radius: 4px; border-left: 3px solid #0052A3; position: relative;">
                        <div style="position: absolute; top: 10px; right: 10px; width: 24px; height: 24px; background: #0052A3; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700;">③</div>
                        <h4 style="font-size: 11px; font-weight: 700; color: #999; text-transform: uppercase; letter-spacing: 0.3px; margin: 0 0 10px 0;">Production</h4>
                        <h3 style="font-size: 14px; font-weight: 700; color: #0052A3; margin: 0 0 8px 0;">本番品質</h3>
                        <p style="font-size: 11px; line-height: 1.55; color: #666; margin: 0;">拡張性の高いモダンな設計で、スモールスタートから大規模展開まで耐えうる基盤を構築。</p>
                    </div>
                </div>

                <div style="padding: 12px; background: linear-gradient(135deg, #e0f2fe 0%, #ecf0ff 100%); border-radius: 4px; border-left: 3px solid #0052A3; margin-top: 15px;">
                    <p style="font-size: 11px; color: #0052A3; margin: 0; font-weight: 500;"><strong>Tech Stack:</strong> Next.js / React / TypeScript / Tailwind CSS / Enterprise Quality</p>
                </div>
            </div>
        </div>
    </div>

    <!-- ===== ページ12: Finance Strategy ===== -->
    <div class="page" data-slide="12">
        <div class="content-page">
            <div class="page-header">
                <h2>FINANCE STRATEGY</h2>
                <span class="page-number">Page 12</span>
            </div>

            <div class="content-wrapper">
                <div class="content-block">
                    <h3>IT予算を「消費」から「投資」へ。</h3>
                    <p>財務の健全化 × DX戦略の再構築</p>
                </div>

                <div class="grid-2col" style="margin: 20px 0;">
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        <div style="padding: 12px; background: #f8f9fa; border-left: 3px solid #0052A3; border-radius: 3px; transition: all 0.3s ease; cursor: pointer;" onmouseover="this.style.background='#f0f4ff'; this.style.boxShadow='0 4px 12px rgba(0, 82, 163, 0.1)'" onmouseout="this.style.background='#f8f9fa'; this.style.boxShadow='none'">
                            <p style="font-size: 11px; font-weight: 600; color: #0052A3; margin: 0 0 5px 0;">01. 無駄の特定</p>
                            <p style="font-size: 10px; color: #666; margin: 0;">徹底したコスト監査で維持費を削減</p>
                        </div>
                        <div style="padding: 12px; background: #f8f9fa; border-left: 3px solid #0052A3; border-radius: 3px; transition: all 0.3s ease; cursor: pointer;" onmouseover="this.style.background='#f0f4ff'; this.style.boxShadow='0 4px 12px rgba(0, 82, 163, 0.1)'" onmouseout="this.style.background='#f8f9fa'; this.style.boxShadow='none'">
                            <p style="font-size: 11px; font-weight: 600; color: #0052A3; margin: 0 0 5px 0;">02. 原資の創出</p>
                            <p style="font-size: 10px; color: #666; margin: 0;">削減分をそのまま新規開発予算へ転換</p>
                        </div>
                        <div style="padding: 12px; background: #f8f9fa; border-left: 3px solid #0052A3; border-radius: 3px; transition: all 0.3s ease; cursor: pointer;" onmouseover="this.style.background='#f0f4ff'; this.style.boxShadow='0 4px 12px rgba(0, 82, 163, 0.1)'" onmouseout="this.style.background='#f8f9fa'; this.style.boxShadow='none'">
                            <p style="font-size: 11px; font-weight: 600; color: #0052A3; margin: 0 0 5px 0;">03. 利益の最大化</p>
                            <p style="font-size: 10px; color: #666; margin: 0;">爆速検証で投資対効果（ROI）を追求</p>
                        </div>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 15px;">
                        <div style="text-align: center; padding: 15px; background: #f8f9fa; border-radius: 4px;">
                            <p style="font-size: 10px; font-weight: 600; color: #999; margin: 0 0 10px 0; text-transform: uppercase;">現状のIT予算</p>
                            <div style="height: 40px; background: #e0e0e0; border-radius: 2px; overflow: hidden; position: relative;">
                                <div style="height: 100%; width: 90%; background: #ccc; display: flex; align-items: center; padding: 0 8px; font-size: 10px; color: #666; font-weight: 600;">固定費 90%</div>
                            </div>
                            <div style="height: 40px; background: linear-gradient(90deg, #fbbf24, #f59e0b); border-radius: 2px; overflow: hidden; position: relative; margin-top: 8px; display: flex; align-items: center; padding: 0 8px; color: white; font-size: 10px; font-weight: 600;">余剰 10%</div>
                        </div>

                        <div style="text-align: center; padding: 15px; background: #f8f9fa; border-radius: 4px; border: 2px solid #0052A3;">
                            <p style="font-size: 10px; font-weight: 600; color: #0052A3; margin: 0 0 10px 0; text-transform: uppercase;">Meece導入後</p>
                            <div style="height: 40px; background: #e0e0e0; border-radius: 2px; overflow: hidden; position: relative;">
                                <div style="height: 100%; width: 40%; background: #9ca3af; display: flex; align-items: center; padding: 0 8px; font-size: 10px; color: #666; font-weight: 600;">固定費</div>
                            </div>
                            <div style="height: 40px; background: linear-gradient(90deg, #fbbf24, #f59e0b); border-radius: 2px; overflow: hidden; position: relative; margin-top: 8px; display: flex; align-items: center; padding: 0 8px; color: white; font-size: 10px; font-weight: 600;">成長投資 60%</div>
                        </div>
                    </div>
                </div>

                <div style="padding: 12px; background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-left: 3px solid #16a34a; border-radius: 4px;">
                    <p style="font-size: 11px; color: #15803d; margin: 0;"><strong>Result:</strong> IT予算の消費率を削減し、成長投資へのシフトを実現。3年で投資対効果3倍以上の事例多数。</p>
                </div>
            </div>
        </div>
    </div>

    <!-- ===== ページ13: Success Stories ===== -->
    <div class="page" data-slide="13">
        <div class="content-page">
            <div class="page-header">
                <h2>SUCCESS STORIES</h2>
                <span class="page-number">Page 13</span>
            </div>

            <div class="content-wrapper">
                <div class="content-block">
                    <h3>AI開発ラボが実現した、圧倒的な実行スピードの証明。</h3>
                </div>

                <div class="grid-2col" style="margin: 20px 0;">
                    <div style="padding: 18px; background: linear-gradient(135deg, #f8f9fa 0%, #f0f4ff 100%); border-radius: 4px; border-left: 4px solid #0052A3;">
                        <h4 style="font-size: 12px; font-weight: 700; color: #0052A3; margin: 0 0 10px 0;">CASE 01: 老舗菓子店</h4>
                        <p style="font-size: 11px; line-height: 1.6; color: #555; margin: 0 0 12px 0;">伝統を守るためのデジタル変革。創業100年の熟練の勘をAIが継承。手書き伝票による月間160時間の事務工数を、わずか10日間の開発で自動化しました。</p>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                            <div style="padding: 10px; background: white; border-radius: 3px; text-align: center;">
                                <p style="font-size: 10px; color: #999; margin: 0 0 5px 0;">Development</p>
                                <p style="font-size: 14px; font-weight: 700; color: #0052A3; margin: 0;">10 Days</p>
                            </div>
                            <div style="padding: 10px; background: white; border-radius: 3px; text-align: center;">
                                <p style="font-size: 10px; color: #999; margin: 0 0 5px 0;">Cost Reduction</p>
                                <p style="font-size: 14px; font-weight: 700; color: #16a34a; margin: 0;">80% OFF</p>
                            </div>
                        </div>
                    </div>

                    <div style="padding: 18px; background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border-radius: 4px; border-left: 4px solid var(--meece-blue); color: white;">
                        <h4 style="font-size: 12px; font-weight: 700; color: var(--meece-blue); margin: 0 0 10px 0;">CASE 02: Fintechベンチャー</h4>
                        <p style="font-size: 11px; line-height: 1.6; color: #aaa; margin: 0 0 12px 0;">14日間でPMF達成。他社で「半年」と言われたMVP開発を2週間で完遂。資金が底を突く前に市場検証を開始し、2ヶ月での追加調達に成功しました。</p>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                            <div style="padding: 10px; background: rgba(255, 255, 255, 0.05); border-radius: 3px; text-align: center;">
                                <p style="font-size: 10px; color: #666; margin: 0 0 5px 0;">MVP Launch</p>
                                <p style="font-size: 14px; font-weight: 700; color: var(--meece-blue); margin: 0;">14 Days</p>
                            </div>
                            <div style="padding: 10px; background: rgba(255, 255, 255, 0.05); border-radius: 3px; text-align: center;">
                                <p style="font-size: 10px; color: #666; margin: 0 0 5px 0;">Validation</p>
                                <p style="font-size: 14px; font-weight: 700; color: var(--meece-blue); margin: 0;">PMF✓</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div style="padding: 15px; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 4px; border-left: 3px solid #f59e0b; margin-top: 15px;">
                    <p style="font-size: 11px; color: #92400e; margin: 0;"><strong style="color: #d97706;">Key Insight:</strong> Meeceのハイブリッド開発フローにより、従来の開発時間を90%削減。これまで「できない」と諦めていた案件が、今では「できる」に変わる。</p>
                </div>
            </div>
        </div>
    </div>

    <!-- ===== ページ14: Our Mindset ===== -->
    <div class="page" data-slide="14">
        <div class="content-page">
            <div class="page-header">
                <h2>OUR MINDSET</h2>
                <span class="page-number">Page 14</span>
            </div>

            <div class="content-wrapper">
                <div class="content-block">
                    <h3>「当事者」以上の当事者意識を。</h3>
                    <p>私たちは、依頼されたものを作るだけの集団ではありません。あなたの事業の成功を、誰よりも強く、深く、自らのこととして考え抜きます。迷いや葛藤も含めて共有し、共に正解を創り上げる。それがMeeceのスタイルです。</p>
                </div>

                <div class="grid-2col" style="margin: 20px 0;">
                    <div style="padding: 20px; background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%); border-radius: 4px; border-left: 4px solid var(--meece-pink);">
                        <h4 style="font-size: 11px; font-weight: 700; color: var(--meece-pink); text-transform: uppercase; margin: 0 0 10px 0; letter-spacing: 0.3px;">💡 Innovative</h4>
                        <h3 style="font-size: 13px; font-weight: 700; color: var(--meece-pink); margin: 0 0 8px 0;">本質的な提案力</h3>
                        <p style="font-size: 11px; line-height: 1.6; color: #666; margin: 0;">言われた通りに作るのではなく、「本当にそれは必要なのか？」という問いを立て、事業価値を最大化する提案を行います。</p>
                    </div>

                    <div style="padding: 20px; background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%); border-radius: 4px; border-left: 4px solid var(--meece-blue);">
                        <h4 style="font-size: 11px; font-weight: 700; color: var(--meece-blue); text-transform: uppercase; margin: 0 0 10px 0; letter-spacing: 0.3px;">⚡ Proactive</h4>
                        <h3 style="font-size: 13px; font-weight: 700; color: var(--meece-blue); margin: 0 0 8px 0;">一蓮托生のチーム体制</h3>
                        <p style="font-size: 11px; line-height: 1.6; color: #666; margin: 0;">クライアントと制作側の壁を取り払い、一つのSlack、一つの目的に向かって最速で動く体制を構築します。</p>
                    </div>
                </div>

                <div style="padding: 20px; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 4px; border-left: 4px solid #f59e0b;">
                    <h4 style="font-size: 11px; font-weight: 700; color: #d97706; text-transform: uppercase; margin: 0 0 10px 0; letter-spacing: 0.3px;">❤️ Passionate</h4>
                    <h3 style="font-size: 13px; font-weight: 700; color: #d97706; margin: 0 0 8px 0;">完遂する熱量</h3>
                    <p style="font-size: 11px; line-height: 1.6; color: #666; margin: 0;">どんな困難があっても投げ出さない。物語が「完結」するその瞬間まで、現場の最前線で走り抜きます。</p>
                </div>
            </div>
        </div>
    </div>

    <!-- ===== ページ15: Future Vision ===== -->
    <div class="page" data-slide="15">
        <div class="content-page">
            <div class="page-header">
                <h2>FUTURE VISION</h2>
                <span class="page-number">Page 15</span>
            </div>

            <div class="content-wrapper">
                <div class="content-block">
                    <h3>2026年、Meece独自の「物語」が動き出す。</h3>
                    <p>AI開発ラボで培った「爆速実装技術」と「多角的ドメインの知見」。これらを結集させ、私たちは特定の業界課題を根本から解決する独自のAIプロダクトを解禁します。</p>
                </div>

                <div class="grid-3col" style="margin: 20px 0;">
                    <div style="padding: 18px; background: linear-gradient(135deg, #f3e8ff 0%, #ede9fe 100%); border-radius: 4px; border-left: 3px solid var(--meece-purple); position: relative; overflow: hidden;">
                        <div style="position: absolute; top: -20px; right: -20px; width: 80px; height: 80px; background: rgba(139, 92, 246, 0.1); border-radius: 50%;"></div>
                        <div style="position: relative; z-index: 1;">
                            <h4 style="font-size: 11px; font-weight: 700; color: var(--meece-purple); text-transform: uppercase; margin: 0 0 5px 0; letter-spacing: 0.3px;">Step 01</h4>
                            <h3 style="font-size: 13px; font-weight: 700; color: var(--meece-purple); margin: 0 0 8px 0;">Product Launch</h3>
                            <p style="font-size: 10px; line-height: 1.55; color: #666; margin: 0;">AI開発ラボの基盤をSaaS化。誰もが直感的に「動く資産」を手に入れられるプラットフォームを提供。</p>
                        </div>
                    </div>

                    <div style="padding: 18px; background: linear-gradient(135deg, #e0f2fe 0%, #cffafe 100%); border-radius: 4px; border-left: 3px solid var(--meece-blue); position: relative; overflow: hidden;">
                        <div style="position: absolute; top: -20px; right: -20px; width: 80px; height: 80px; background: rgba(0, 229, 255, 0.1); border-radius: 50%;"></div>
                        <div style="position: relative; z-index: 1;">
                            <h4 style="font-size: 11px; font-weight: 700; color: var(--meece-blue); text-transform: uppercase; margin: 0 0 5px 0; letter-spacing: 0.3px;">Step 02</h4>
                            <h3 style="font-size: 13px; font-weight: 700; color: var(--meece-blue); margin: 0 0 8px 0;">Vertical AI</h3>
                            <p style="font-size: 10px; line-height: 1.55; color: #666; margin: 0;">製造・医療・教育。現場に特化した「垂直統合型AI」を展開し、業界の標準OSを塗り替える。</p>
                        </div>
                    </div>

                    <div style="padding: 18px; background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%); border-radius: 4px; border-left: 3px solid var(--meece-pink); position: relative; overflow: hidden;">
                        <div style="position: absolute; top: -20px; right: -20px; width: 80px; height: 80px; background: rgba(255, 91, 174, 0.1); border-radius: 50%;"></div>
                        <div style="position: relative; z-index: 1;">
                            <h4 style="font-size: 11px; font-weight: 700; color: var(--meece-pink); text-transform: uppercase; margin: 0 0 5px 0; letter-spacing: 0.3px;">Step 03</h4>
                            <h3 style="font-size: 13px; font-weight: 700; color: var(--meece-pink); margin: 0 0 8px 0;">Global Expansion</h3>
                            <p style="font-size: 10px; line-height: 1.55; color: #666; margin: 0;">言語と文化の壁をAIで突破。日本発の知能を、世界中の「止まっている現場」へ届ける。</p>
                        </div>
                    </div>
                </div>

                <div style="padding: 15px; background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%); border-radius: 4px; border: 1px solid var(--meece-purple); text-align: center;">
                    <p style="font-size: 11px; color: var(--meece-purple); margin: 0;"><strong>Meece Vision 2030:</strong> 世界の「止まっている課題」を、AI技術で根本から解決する。そこが次のフロンティアです。</p>
                </div>
            </div>
        </div>
    </div>

    <!-- ===== ページ16: Next Action ===== -->
    <div class="page" data-slide="16">
        <div class="content-page">
            <div class="page-header">
                <h2>NEXT ACTION</h2>
                <span class="page-number">Page 16</span>
            </div>

            <div class="content-wrapper">
                <div class="content-block" style="text-align: center;">
                    <h3 style="font-size: 14px;">次のページを、一緒に。</h3>
                    <p>Meeceは、あなたの事業という壮大な物語を完成させるための「最後の一片（ラスト・ピース）」です。まずは、現在の課題や理想の姿を私たちに聞かせてください。共に新たな歴史を刻みましょう。</p>
                </div>

                <div class="grid-2col" style="margin: 30px 0; gap: 30px;">
                    <div style="padding: 20px; background: linear-gradient(135deg, #f8f9fa 0%, #f0f4ff 100%); border-radius: 4px; border: 2px solid #0052A3; text-align: center; cursor: pointer; transition: all 0.3s ease;" onmouseover="this.style.background='linear-gradient(135deg, #0052A3 0%, #0066CC 100%)'; this.querySelector('h4').style.color='white'; this.querySelector('p').style.color='rgba(255,255,255,0.9)'; this.style.boxShadow='0 8px 24px rgba(0, 82, 163, 0.2)'" onmouseout="this.style.background='linear-gradient(135deg, #f8f9fa 0%, #f0f4ff 100%)'; this.querySelector('h4').style.color='#0052A3'; this.querySelector('p').style.color='#666'; this.style.boxShadow='none'">
                        <div style="font-size: 24px; margin-bottom: 10px;">📋</div>
                        <h4 style="font-size: 13px; font-weight: 700; color: #0052A3; margin: 0 0 8px 0; transition: color 0.3s ease;">AI開発適正診断</h4>
                        <p style="font-size: 11px; color: #666; margin: 0; transition: color 0.3s ease;">あなたのプロジェクトに<br>AI開発ラボが活用できるか診断</p>
                    </div>

                    <div style="padding: 20px; background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border-radius: 4px; border: 2px solid var(--meece-blue); text-align: center; cursor: pointer; transition: all 0.3s ease;" onmouseover="this.style.boxShadow='0 8px 24px rgba(0, 229, 255, 0.2)'" onmouseout="this.style.boxShadow='none'">
                        <div style="font-size: 24px; margin-bottom: 10px; color: var(--meece-blue);">✉️</div>
                        <h4 style="font-size: 13px; font-weight: 700; color: var(--meece-blue); margin: 0 0 8px 0;">お問い合わせ</h4>
                        <p style="font-size: 11px; color: #aaa; margin: 0;">Meeceのサービスについて<br>詳しく知りたい方はこちら</p>
                    </div>
                </div>

                <div style="padding: 12px; border-top: 1px solid #e0e0e0; margin-top: 15px; padding-top: 15px;">
                    <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 20px; align-items: center; font-size: 10px; color: #999;">
                        <div>
                            <p style="margin: 0;"><strong>Meece株式会社</strong></p>
                            <p style="margin: 3px 0 0 0;">〒100-0005 東京都千代田区丸の内</p>
                        </div>
                        <span>|</span>
                        <div style="text-align: right;">
                            <p style="margin: 0;">TEL: 03-5288-5125</p>
                            <p style="margin: 3px 0 0 0;">info@meece.io</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- ===== ページ17: EPILOGUE ===== -->
    <div class="page" data-slide="17">
        <div class="content-page dark-bg" style="background: linear-gradient(135deg, #020617 0%, #0f1629 50%, #0d0520 100%); display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <div style="text-align: center; position: relative; z-index: 2; max-width: 80%;">
                <div style="font-size: 12px; color: var(--meece-blue); text-transform: uppercase; letter-spacing: 0.5em; margin-bottom: 15px; font-weight: 600;">Final Page</div>

                <h2 style="font-size: 42px; font-weight: 900; margin: 0 0 20px 0; background: linear-gradient(135deg, var(--meece-blue) 0%, var(--meece-purple) 50%, var(--meece-pink) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">AIのその先へ。</h2>

                <h3 style="font-size: 18px; font-weight: 600; color: #aaa; margin: 0 0 20px 0; line-height: 1.6;">未知なる新技術の開拓に向けて</h3>

                <p style="font-size: 12px; line-height: 1.8; color: #888; margin: 0;">私たちの旅はAIで終わりません。<br>まだ見ぬ技術の地平を目指して。<br><br>Meeceがお届けする物語は、ここで一度幕を閉じます。<br>しかし、あなたの事業の物語は、ここからが本番です。</p>

                <div style="margin-top: 30px; padding: 20px; border-top: 1px solid rgba(139, 92, 246, 0.3); border-bottom: 1px solid rgba(139, 92, 246, 0.3);">
                    <p style="font-size: 11px; color: var(--meece-blue); margin: 0; font-weight: 600;">© 2026 MEECE Inc. All Stories Reserved.</p>
                </div>

                <p style="font-size: 10px; color: #666; margin: 20px 0 0 0;">Thank you for joining our journey.<br>Let's create the next chapter together.</p>
            </div>

            <!-- 背景装飾 -->
            <div style="position: absolute; top: 10%; right: 5%; width: 200px; height: 200px; background: radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%); border-radius: 50%; z-index: 0;"></div>
            <div style="position: absolute; bottom: 10%; left: 5%; width: 150px; height: 150px; background: radial-gradient(circle, rgba(0, 229, 255, 0.08) 0%, transparent 70%); border-radius: 50%; z-index: 0;"></div>
        </div>
    </div>

</body>
</html>
