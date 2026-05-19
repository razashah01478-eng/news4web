/*
  # Seed Categories and Demo News Articles

  1. Inserts all 13 news categories with icons and colors
  2. Inserts 30 realistic demo news articles across all categories
  3. Sets breaking news, featured, and trending flags
*/

-- Insert categories
INSERT INTO categories (name, slug, description, icon, color) VALUES
  ('Politics', 'politics', 'Political news, elections, government policy', 'landmark', '#ef4444'),
  ('World', 'world', 'International news from around the globe', 'globe', '#3b82f6'),
  ('Wars & Conflicts', 'wars-conflicts', 'Military conflicts, geopolitical tensions', 'shield-alert', '#dc2626'),
  ('Crime', 'crime', 'Crime news, law enforcement, justice', 'gavel', '#7c3aed'),
  ('Accidents', 'accidents', 'Accidents, disasters, emergency response', 'triangle-alert', '#f59e0b'),
  ('Diseases', 'diseases', 'Health crises, outbreaks, medical alerts', 'activity', '#10b981'),
  ('Science', 'science', 'Scientific discoveries and research', 'flask-conical', '#06b6d4'),
  ('Discoveries', 'discoveries', 'New discoveries in science and exploration', 'telescope', '#8b5cf6'),
  ('Technology', 'technology', 'Tech news, AI, innovation, gadgets', 'cpu', '#0ea5e9'),
  ('Business', 'business', 'Markets, economy, finance, corporations', 'trending-up', '#f97316'),
  ('Sports', 'sports', 'Sports news, scores, athlete profiles', 'trophy', '#22c55e'),
  ('Entertainment', 'entertainment', 'Movies, music, celebrities, culture', 'clapperboard', '#ec4899'),
  ('Health', 'health', 'Health tips, medical research, wellness', 'heart-pulse', '#14b8a6')
ON CONFLICT (slug) DO NOTHING;

-- Insert demo articles
INSERT INTO articles (title, slug, excerpt, content, image_url, source_name, source_url, author, category_slug, country, is_breaking, is_featured, is_trending, url_hash, published_at, ai_summary, ai_tags)
SELECT * FROM (VALUES
  (
    'World Leaders Gather at Emergency UN Summit to Address Rising Global Tensions',
    'world-leaders-un-emergency-summit-2026',
    'Heads of state from over 80 countries convened in New York for an unprecedented emergency session addressing escalating diplomatic crises across three continents.',
    'World leaders convened at the United Nations headquarters in New York City for an emergency summit addressing the most significant diplomatic crisis in over two decades. Representatives from more than 80 nations gathered to discuss escalating tensions in multiple regions, with Secretary-General António Guterres calling the meeting "the most critical diplomatic gathering of this generation." The summit focused on three primary crises: ongoing conflicts in Eastern Europe, rising tensions in the South China Sea, and destabilizing political upheaval across the Sahel region of Africa. Key resolutions proposed include a new multilateral peacekeeping framework and emergency economic aid packages for affected nations.',
    'https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Reuters', 'https://reuters.com', 'Sarah Mitchell', 'world', 'US', true, true, true,
    'hash_001', now() - interval '2 hours',
    'World leaders met at the UN for an emergency summit addressing global diplomatic crises across three regions, proposing new peacekeeping frameworks.',
    ARRAY['UN', 'diplomacy', 'world leaders', 'peace', 'geopolitics']
  ),
  (
    'Breakthrough AI Model Can Now Predict Disease Outbreaks 30 Days in Advance',
    'ai-model-predicts-disease-outbreaks-30-days',
    'Scientists at MIT and WHO have jointly developed an artificial intelligence system that accurately forecasts infectious disease outbreaks with unprecedented accuracy.',
    'A revolutionary artificial intelligence system developed jointly by researchers at MIT and the World Health Organization can now predict infectious disease outbreaks up to 30 days before they occur, achieving 94% accuracy in field trials across 12 countries. The model, dubbed SENTINEL-AI, analyzes millions of data points including climate patterns, population movement, sanitation infrastructure, vaccination rates, and social media signals to identify outbreak conditions. In trials conducted across sub-Saharan Africa, Southeast Asia, and Latin America, the system correctly predicted 47 of 50 disease outbreaks. Health officials are calling this the most significant advance in epidemiological forecasting in history.',
    'https://images.pexels.com/photos/3861458/pexels-photo-3861458.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Science Daily', 'https://sciencedaily.com', 'Dr. James Chen', 'science', 'US', false, true, true,
    'hash_002', now() - interval '4 hours',
    'MIT and WHO developed an AI system that predicts disease outbreaks 30 days ahead with 94% accuracy using multi-source data analysis.',
    ARRAY['AI', 'disease', 'MIT', 'WHO', 'healthcare', 'technology']
  ),
  (
    'Global Markets Surge as Central Banks Signal End to Rate Hike Cycle',
    'global-markets-surge-central-banks-rate-hikes-end',
    'Stock markets worldwide posted their biggest single-day gains in two years after the Federal Reserve, ECB, and Bank of England all signaled a pause in interest rate increases.',
    'Global financial markets erupted in a historic rally on Tuesday as three of the world''s most powerful central banks simultaneously signaled an end to their aggressive interest rate hiking campaigns. The Dow Jones Industrial Average jumped 847 points, the S&P 500 surged 3.2%, and European markets posted gains averaging 4.1%. The Federal Reserve, European Central Bank, and Bank of England all issued statements suggesting inflation had been sufficiently tamed, opening the door to potential rate cuts by year end. Currency markets saw the US dollar weaken significantly against most major currencies, while gold hit a six-month high.',
    'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Financial Times', 'https://ft.com', 'Emma Rodriguez', 'business', 'UK', false, true, true,
    'hash_003', now() - interval '5 hours',
    'Global markets surged with major indices gaining 3-4% after the Fed, ECB, and Bank of England signaled an end to interest rate hikes.',
    ARRAY['markets', 'Federal Reserve', 'ECB', 'interest rates', 'economy', 'stocks']
  ),
  (
    'New Species of Deep-Sea Creature Discovered Near Mariana Trench',
    'new-species-deep-sea-mariana-trench-discovery',
    'Marine biologists aboard the research vessel Nautilus have documented 23 previously unknown species during a deep-sea expedition to the Pacific Ocean''s deepest point.',
    'A team of marine biologists conducting a six-week deep-sea expedition near the Mariana Trench has made one of the most significant discoveries in modern oceanography. The researchers, using cutting-edge remotely operated vehicles equipped with 8K cameras and advanced sampling equipment, documented 23 previously unknown species including a bioluminescent jellyfish measuring over 2 meters in length, seven new types of sea cucumber, and what appears to be the deepest-dwelling fish ever recorded at 11,034 meters below the surface. Dr. Lisa Park from the Scripps Institution of Oceanography described the discovery as "fundamentally reshaping our understanding of the limits of life on Earth."',
    'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800',
    'National Geographic', 'https://natgeo.com', 'Dr. Lisa Park', 'discoveries', 'US', false, false, true,
    'hash_004', now() - interval '6 hours',
    'Marine biologists discovered 23 new species near the Mariana Trench, including the deepest-dwelling fish ever recorded at 11,034 meters.',
    ARRAY['ocean', 'marine biology', 'Mariana Trench', 'discovery', 'deep sea', 'species']
  ),
  (
    'Tech Giant Announces $50 Billion Investment in Next-Generation Quantum Computing',
    'tech-giant-50-billion-quantum-computing-investment',
    'In the largest single corporate investment in quantum technology history, a leading technology corporation has committed $50 billion to build quantum supercomputers over the next decade.',
    'In what analysts are calling the most ambitious corporate technology investment in history, a leading global technology corporation announced a $50 billion commitment to develop practical quantum computing systems over the next decade. The announcement sent shockwaves through the technology sector, with competitors'' stock prices dropping sharply. The company plans to build 15 quantum computing research centers across North America, Europe, and Asia, employing over 12,000 quantum physicists and engineers. Company leadership stated that functional quantum computers could solve problems in drug discovery, climate modeling, and financial optimization that are currently impossible for classical computers.',
    'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    'TechCrunch', 'https://techcrunch.com', 'Michael Chang', 'technology', 'US', false, true, true,
    'hash_005', now() - interval '7 hours',
    'A tech giant committed $50B to quantum computing over 10 years, planning 15 research centers and 12,000 new jobs in quantum physics.',
    ARRAY['quantum computing', 'technology', 'investment', 'AI', 'innovation']
  ),
  (
    'Historic Peace Agreement Signed Ending Decade-Long Regional Conflict',
    'historic-peace-agreement-decade-long-conflict',
    'After 14 months of secret negotiations facilitated by Norway, two neighboring nations have signed a comprehensive peace treaty ending a conflict that claimed over 200,000 lives.',
    'In a historic ceremony held in Oslo, representatives of two nations engaged in a decade-long conflict signed a comprehensive peace agreement, formally ending hostilities that claimed over 200,000 lives and displaced more than three million people. The agreement, mediated by Norwegian diplomatic teams over 14 months of intensive secret negotiations, includes provisions for power-sharing government, demilitarization of border regions, economic integration, and a transitional justice mechanism to address war crimes. International observers called the agreement a model for conflict resolution and a testament to patient diplomacy. Implementation will be monitored by a joint UN-African Union peacekeeping force.',
    'https://images.pexels.com/photos/4021262/pexels-photo-4021262.jpeg?auto=compress&cs=tinysrgb&w=800',
    'AP News', 'https://apnews.com', 'David Okonkwo', 'wars-conflicts', 'NO', true, true, false,
    'hash_006', now() - interval '1 hour',
    'Two nations signed a peace agreement in Oslo ending a decade-long conflict that killed 200,000 people, featuring power-sharing and transitional justice.',
    ARRAY['peace', 'conflict', 'diplomacy', 'Norway', 'United Nations', 'war']
  ),
  (
    'Scientists Develop Revolutionary Battery That Charges Smartphones in 30 Seconds',
    'revolutionary-battery-charges-smartphone-30-seconds',
    'Israeli researchers at Tel Aviv University have announced a breakthrough in graphene-based battery technology that could eliminate charging wait times for consumer electronics.',
    'Researchers at Tel Aviv University have unveiled a graphene-based battery technology that can fully charge a smartphone in under 30 seconds and an electric vehicle in under five minutes. The breakthrough, published in the journal Nature Energy, uses a novel three-dimensional graphene structure that allows for dramatically faster ion transfer compared to conventional lithium-ion batteries. In laboratory tests, the batteries maintained 95% capacity after 5,000 charge cycles, significantly outperforming current technology. The research team has secured $200 million in venture funding and expects to begin commercial production within three years, potentially transforming the consumer electronics and electric vehicle industries.',
    'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=800',
    'BBC Technology', 'https://bbc.com/technology', 'Yael Cohen', 'technology', 'IL', false, false, true,
    'hash_007', now() - interval '9 hours',
    'Tel Aviv University developed a graphene battery that charges phones in 30 seconds and EVs in 5 minutes, maintaining 95% capacity after 5,000 cycles.',
    ARRAY['battery', 'graphene', 'technology', 'electric vehicles', 'innovation', 'Israel']
  ),
  (
    'Major Earthquake Strikes Densely Populated Region, Thousands Displaced',
    'major-earthquake-strikes-densely-populated-region',
    'A 7.8 magnitude earthquake struck a major metropolitan area early Tuesday morning, causing significant structural damage and triggering international humanitarian response.',
    'A powerful 7.8 magnitude earthquake struck a densely populated region early Tuesday morning, causing widespread structural damage to thousands of buildings and triggering immediate international humanitarian response. The earthquake, which struck at 4:37 AM local time, was felt across a radius of 800 kilometers. Emergency services reported over 15,000 people displaced from their homes, with search and rescue operations ongoing across multiple districts. International aid organizations including the Red Cross and Médecins Sans Frontières deployed emergency response teams within hours. Government authorities declared a national state of emergency and issued appeals for international assistance.',
    'https://images.pexels.com/photos/1739010/pexels-photo-1739010.jpeg?auto=compress&cs=tinysrgb&w=800',
    'CNN International', 'https://cnn.com', 'Maria Santos', 'accidents', 'TR', true, false, false,
    'hash_008', now() - interval '30 minutes',
    'A 7.8 magnitude earthquake displaced 15,000 people in a major metropolitan area, triggering international humanitarian response.',
    ARRAY['earthquake', 'disaster', 'emergency', 'humanitarian', 'natural disaster']
  ),
  (
    'Record-Breaking Runner Shatters Marathon World Record at Berlin Race',
    'marathon-world-record-shattered-berlin-2026',
    'Ethiopian athlete Bekele Tadesse has obliterated the marathon world record in Berlin, crossing the finish line in 1:55:23, nearly four minutes faster than the previous best.',
    'Ethiopian long-distance running sensation Bekele Tadesse made history at the Berlin Marathon on Sunday, crossing the finish line in an astonishing 1:55:23, shattering the previous world record by three minutes and 47 seconds. Running in perfect conditions at 12°C with minimal wind, Tadesse maintained a blistering pace that left competitors and spectators in disbelief. The 24-year-old, who only turned professional two years ago, completed the first half in 57:41, a split that itself would have been world-class just a decade ago. Athletics experts are calling the performance the greatest individual achievement in the history of distance running.',
    'https://images.pexels.com/photos/2524749/pexels-photo-2524749.jpeg?auto=compress&cs=tinysrgb&w=800',
    'ESPN', 'https://espn.com', 'Carlos Mendes', 'sports', 'ET', false, false, true,
    'hash_009', now() - interval '12 hours',
    'Ethiopian runner Bekele Tadesse broke the marathon world record in Berlin with a time of 1:55:23, nearly 4 minutes faster than the previous record.',
    ARRAY['marathon', 'world record', 'athletics', 'Berlin', 'Ethiopia', 'sports']
  ),
  (
    'Hollywood''s Biggest Blockbuster Breaks All-Time Box Office Records',
    'hollywood-blockbuster-breaks-all-time-box-office-records',
    'The most expensive film ever produced has shattered global box office records in its opening weekend, earning $987 million across 172 countries in just three days.',
    'The most expensive film ever produced has shattered all box office records in its opening weekend, earning an unprecedented $987 million globally across 172 countries in just 72 hours. The science fiction epic, produced at a reported cost of $650 million, broke the previous opening weekend record by over $300 million. In North America alone, the film earned $312 million, while international markets contributed $675 million. Industry analysts predict the film could become the first to surpass $5 billion in global box office earnings. Critics have given the film unanimous acclaim, with a 98% approval rating, calling it a technical and storytelling masterpiece.',
    'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Variety', 'https://variety.com', 'Sophie Turner', 'entertainment', 'US', false, false, true,
    'hash_010', now() - interval '15 hours',
    'A $650M sci-fi film earned $987M globally in its opening weekend across 172 countries, breaking all box office records.',
    ARRAY['movies', 'box office', 'Hollywood', 'blockbuster', 'entertainment', 'cinema']
  ),
  (
    'New Cancer Treatment Achieves 90% Remission Rate in Clinical Trials',
    'new-cancer-treatment-90-percent-remission-clinical-trials',
    'A novel immunotherapy approach targeting previously untreatable aggressive cancers has shown extraordinary results in Phase 3 clinical trials involving 2,000 patients.',
    'A revolutionary immunotherapy treatment developed by researchers at Johns Hopkins and the Mayo Clinic has achieved a 90% complete remission rate in Phase 3 clinical trials for several aggressive cancer types previously considered untreatable. The treatment, which uses engineered CAR-T cells combined with a novel checkpoint inhibitor, was tested on 2,000 patients across 45 hospitals in 15 countries. Participants had exhausted all other treatment options before entering the trial. Of the 2,000 participants, 1,800 achieved complete remission within six months, with 94% of those patients remaining cancer-free 18 months later. The FDA has fast-tracked approval consideration.',
    'https://images.pexels.com/photos/3825539/pexels-photo-3825539.jpeg?auto=compress&cs=tinysrgb&w=800',
    'The Lancet', 'https://thelancet.com', 'Dr. Rachel Kim', 'health', 'US', false, true, true,
    'hash_011', now() - interval '18 hours',
    'A new immunotherapy achieved 90% remission in aggressive cancers during Phase 3 trials on 2,000 patients, with FDA fast-track approval pending.',
    ARRAY['cancer', 'immunotherapy', 'clinical trial', 'medicine', 'health', 'breakthrough']
  ),
  (
    'Presidential Election Results Overturn Decades of Political Dominance',
    'presidential-election-results-overturn-political-dominance',
    'In a historic electoral upset, an independent candidate has won the presidency in a major democracy, ending a 40-year reign by the country''s two dominant political parties.',
    'In one of the most stunning electoral upsets in modern democratic history, independent candidate Maria Elena Vasquez has won the presidential election in a major Latin American nation, ending 40 years of dominance by the country''s two traditional political parties. Vasquez, a 44-year-old former journalist and anti-corruption activist, won 54% of the vote, defeating candidates from both established parties by double digits. International observers declared the election free and fair, with record voter turnout of 78%. Vasquez has pledged to prioritize anti-corruption reforms, economic equality, and environmental protection, delivering her victory speech in three languages to cheering crowds.',
    'https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg?auto=compress&cs=tinysrgb&w=800',
    'The Guardian', 'https://theguardian.com', 'Pedro Alves', 'politics', 'BR', false, true, false,
    'hash_012', now() - interval '20 hours',
    'Independent candidate Maria Elena Vasquez won a presidential election with 54% of the vote, ending 40 years of two-party dominance.',
    ARRAY['election', 'politics', 'democracy', 'Latin America', 'anti-corruption']
  ),
  (
    'International Drug Cartel Network Dismantled in 23-Country Police Operation',
    'drug-cartel-network-dismantled-23-country-police-operation',
    'Law enforcement agencies across 23 countries coordinated a massive simultaneous operation arresting over 800 cartel members and seizing assets worth $12 billion.',
    'In the largest coordinated international law enforcement operation in history, police agencies across 23 countries simultaneously executed over 400 search warrants, arrested 847 suspected cartel members, and seized assets valued at more than $12 billion. Operation Tsunami, coordinated by Europol and Interpol over three years, targeted a transnational drug trafficking network responsible for distributing narcotics worth an estimated $30 billion annually. Authorities seized 23 tonnes of cocaine, 45 tonnes of cannabis, luxury vehicles, aircraft, superyachts, real estate, and cryptocurrency wallets containing $4.2 billion. The operation is being hailed as a turning point in the global fight against organized crime.',
    'https://images.pexels.com/photos/7669135/pexels-photo-7669135.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Interpol News', 'https://interpol.int', 'Jean-Pierre Moreau', 'crime', 'FR', true, false, true,
    'hash_013', now() - interval '3 hours',
    'Operation Tsunami arrested 847 cartel members across 23 countries, seizing $12B in assets including $4.2B in cryptocurrency.',
    ARRAY['crime', 'drug cartel', 'Interpol', 'law enforcement', 'international', 'operation']
  ),
  (
    'Space Agency Confirms Discovery of Liquid Water on Mars',
    'space-agency-confirms-liquid-water-mars-discovery',
    'NASA and ESA jointly confirmed the discovery of a substantial liquid water reservoir beneath the Martian south pole, fundamentally changing our understanding of the red planet.',
    'In a landmark scientific announcement that could redefine humanity''s understanding of Mars and the potential for extraterrestrial life, NASA and the European Space Agency jointly confirmed the existence of a substantial liquid water reservoir beneath the Martian south polar ice cap. Data collected by the MAVEN and ExoMars orbiters, combined with ground-penetrating radar from the Mars Reconnaissance Orbiter, revealed a body of liquid water measuring approximately 40 kilometers wide and at least 1.5 kilometers deep, maintained in liquid form by geothermal activity and dissolved minerals. Scientists are now urgently discussing the implications for potential microbial life and future human missions to Mars.',
    'https://images.pexels.com/photos/73873/pexels-photo-73873.jpeg?auto=compress&cs=tinysrgb&w=800',
    'NASA Science', 'https://science.nasa.gov', 'Dr. Elena Petrova', 'discoveries', 'US', true, true, true,
    'hash_014', now() - interval '8 hours',
    'NASA and ESA confirmed liquid water on Mars — a 40km-wide reservoir beneath the south pole, maintained by geothermal activity.',
    ARRAY['Mars', 'NASA', 'water', 'space', 'discovery', 'astrobiology', 'extraterrestrial']
  ),
  (
    'Wildfire Season Hits Record Levels Across Western North America',
    'wildfire-season-record-levels-western-north-america',
    'An unprecedented wildfire season has burned over 15 million acres across California, British Columbia, and Oregon, forcing mass evacuations of hundreds of thousands of residents.',
    'The 2026 wildfire season across Western North America has shattered all previous records, with over 15 million acres burned across California, British Columbia, and Oregon, exceeding the previous record by nearly 40%. More than 340,000 residents have been forced to evacuate their homes, with dozens of communities completely destroyed. Climate scientists attribute the extreme fire conditions to record-breaking temperatures, historically low precipitation, and years of accumulated fuel from forest management challenges. Firefighting resources from 14 countries have been deployed in what authorities are calling an unprecedented international emergency response.',
    'https://images.pexels.com/photos/51951/forest-fire-fire-smoke-conservation-51951.jpeg?auto=compress&cs=tinysrgb&w=800',
    'CBC News', 'https://cbc.ca', 'Heather Morrison', 'accidents', 'CA', true, false, true,
    'hash_015', now() - interval '10 hours',
    'Record-breaking wildfires burned 15 million acres across Western North America, forcing 340,000 evacuations with 14 countries providing firefighting support.',
    ARRAY['wildfire', 'climate', 'emergency', 'California', 'Canada', 'natural disaster']
  ),
  (
    'Global Health Emergency Declared as Novel Respiratory Virus Spreads',
    'global-health-emergency-novel-respiratory-virus',
    'The World Health Organization has declared a Public Health Emergency of International Concern after a novel respiratory virus with high transmissibility was identified in 47 countries.',
    'The World Health Organization declared a Public Health Emergency of International Concern on Wednesday after a novel respiratory virus, temporarily designated NRV-H5, was identified in 47 countries within a three-week period. The virus, which causes severe respiratory illness in approximately 15% of infected individuals, has shown high transmissibility with an estimated reproduction number between 2.8 and 3.4. WHO Director-General Dr. Tedros urged calm while announcing the activation of the International Health Regulations emergency protocol. Countries worldwide began implementing precautionary public health measures, including enhanced airport screening and accelerated research programs. Two candidate vaccines have already entered expedited Phase 1 trials.',
    'https://images.pexels.com/photos/3952234/pexels-photo-3952234.jpeg?auto=compress&cs=tinysrgb&w=800',
    'WHO', 'https://who.int', 'Dr. Fatima Al-Rashid', 'diseases', 'CH', true, true, true,
    'hash_016', now() - interval '1 hour',
    'WHO declared a PHEIC after a novel respiratory virus spread to 47 countries in 3 weeks, with 2 vaccine candidates already in Phase 1 trials.',
    ARRAY['WHO', 'virus', 'pandemic', 'public health', 'emergency', 'health crisis']
  ),
  (
    'NBA Superstar Signs Record $500 Million Contract Extension',
    'nba-superstar-record-500-million-contract',
    'A two-time MVP and reigning champion has signed a five-year, $500 million contract extension, becoming the highest-paid athlete in professional sports history.',
    'In a deal that has stunned the sports world, NBA superstar Jaylen Rivers signed a five-year, $500 million contract extension with his team on Tuesday, becoming the highest-paid athlete in professional sports history. The 27-year-old, who led his team to back-to-back championships while winning two MVP awards, secured an average annual value of $100 million. The contract includes full no-trade and no-cut protections. Team management defended the unprecedented financial commitment by pointing to Rivers'' positive impact on ticket sales, merchandise revenue, and television ratings, which have collectively generated over $2 billion for the franchise. The signing caps a remarkable offseason for the franchise.',
    'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=800',
    'ESPN', 'https://espn.com', 'Marcus Johnson', 'sports', 'US', false, false, true,
    'hash_017', now() - interval '22 hours',
    'NBA star Jaylen Rivers signed a $500M 5-year deal at $100M per year, becoming the highest-paid athlete in professional sports history.',
    ARRAY['NBA', 'basketball', 'sports contract', 'record', 'athlete']
  ),
  (
    'Electric Vehicle Sales Surpass Gasoline Cars for First Time in History',
    'electric-vehicle-sales-surpass-gasoline-cars-first-time',
    'Global electric vehicle sales exceeded internal combustion engine vehicle sales in the first quarter, marking a historic milestone in the transition to sustainable transportation.',
    'Electric vehicles outsold gasoline-powered cars globally for the first time in automotive history during Q1 2026, with EV sales reaching 23.4 million units compared to 21.8 million for combustion engine vehicles. The milestone, which industry analysts had predicted would not occur until 2030, was driven by dramatic price reductions in battery technology, expanded charging infrastructure, and strong government incentive programs across the European Union, China, and the United States. Chinese manufacturers led global EV sales with a 47% market share, while established automakers from Europe and Japan reported accelerated shifts in their production lines. The milestone is expected to significantly impact global oil demand projections.',
    'https://images.pexels.com/photos/110844/pexels-photo-110844.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Bloomberg', 'https://bloomberg.com', 'Zhang Wei', 'business', 'CN', false, false, true,
    'hash_018', now() - interval '1 day',
    'EVs outsold gasoline cars globally for the first time in Q1 2026, driven by battery cost reductions and government incentives.',
    ARRAY['electric vehicles', 'EV', 'sustainability', 'automotive', 'clean energy', 'climate']
  ),
  (
    'Arctic Ice Sheet Reaches Critical Threshold Scientists Have Long Feared',
    'arctic-ice-sheet-critical-threshold-climate',
    'Satellite data confirms the Arctic summer ice sheet has retreated to its smallest recorded extent, triggering emergency meetings among climate scientists and world governments.',
    'Satellite data released by the National Snow and Ice Data Center confirms the Arctic sea ice has retreated to its smallest summer extent ever recorded, reaching a new minimum 23% below the previous record set in 2012. The development has triggered emergency consultations among leading climate scientists and government officials from Arctic nations. Researchers warn that the accelerating ice loss is creating feedback loops that could permanently alter global weather patterns, disrupt ocean circulation, and release significant quantities of methane from thawing permafrost. UN Secretary-General called the data "a climate alarm of the highest order" and announced emergency consultations among G20 nations.',
    'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Climate Central', 'https://climatecentral.org', 'Prof. Anders Nielsen', 'science', 'DK', false, true, false,
    'hash_019', now() - interval '2 days',
    'Arctic sea ice hit a record minimum 23% below the 2012 record, triggering emergency UN consultations and warnings about accelerating feedback loops.',
    ARRAY['climate change', 'Arctic', 'ice', 'environment', 'global warming', 'science']
  ),
  (
    'Artificial General Intelligence Milestone Claimed by Leading Research Lab',
    'artificial-general-intelligence-milestone-claimed',
    'A prominent AI research organization announced their latest model has passed all standard benchmarks for artificial general intelligence, igniting intense scientific and ethical debate.',
    'A leading artificial intelligence research organization sparked intense global debate after announcing that its latest model had passed all established benchmarks for artificial general intelligence, capable of reasoning, learning, and problem-solving across domains at or above human level. The announcement was immediately met with both excitement and alarm from the scientific community, with many researchers calling for independent verification of the claims. Government officials in the United States, European Union, and China issued statements calling for careful evaluation and potential regulatory frameworks. The organization''s CEO acknowledged the "profound responsibility" of the achievement while emphasizing extensive safety measures.',
    'https://images.pexels.com/photos/8439089/pexels-photo-8439089.jpeg?auto=compress&cs=tinysrgb&w=800',
    'MIT Technology Review', 'https://technologyreview.com', 'Alan Turing III', 'technology', 'US', true, true, true,
    'hash_020', now() - interval '6 hours',
    'A research lab claimed to achieve AGI, passing all established benchmarks for human-level reasoning, sparking global regulatory debate.',
    ARRAY['AGI', 'artificial intelligence', 'AI safety', 'technology', 'research', 'regulation']
  ),
  (
    'Corruption Scandal Rocks Major Government, Multiple Ministers Resign',
    'corruption-scandal-government-ministers-resign',
    'A massive corruption scandal involving infrastructure contracts has forced six cabinet ministers to resign simultaneously, triggering the worst constitutional crisis in the country''s history.',
    'Six cabinet ministers simultaneously resigned from government on Thursday after a parliamentary investigation revealed they had collectively accepted bribes totaling $340 million from construction companies awarded government infrastructure contracts. The scandal, which has rocked the political establishment of a major European democracy, erupted after a whistleblower leaked thousands of internal communications to a local newspaper. The prime minister, facing mounting pressure, called an emergency parliamentary session and announced an independent judicial inquiry. Opposition parties have filed motions of no confidence and called for immediate general elections. The scandal is being compared to some of the worst corruption cases in European political history.',
    'https://images.pexels.com/photos/3856027/pexels-photo-3856027.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Al Jazeera', 'https://aljazeera.com', 'Karim Mansour', 'politics', 'DE', true, false, true,
    'hash_021', now() - interval '4 hours',
    'Six European cabinet ministers resigned after a $340M bribery scandal involving infrastructure contracts was exposed by a whistleblower.',
    ARRAY['corruption', 'politics', 'scandal', 'government', 'bribery', 'Europe']
  ),
  (
    'Scientists Grow First Fully Functional Human Heart in Laboratory',
    'scientists-grow-functional-human-heart-laboratory',
    'In a medical first, researchers at the Karolinska Institute grew a fully functional human heart from induced pluripotent stem cells, potentially solving the organ transplant shortage.',
    'Researchers at the Karolinska Institute in Stockholm announced a breakthrough that could transform transplant medicine: the laboratory growth of the first fully functional human heart from a patient''s own induced pluripotent stem cells. The artificial heart, which began beating spontaneously after 23 days of cultivation in a specialized bioreactor, has maintained consistent rhythm and pumping function for over six months. The organ was grown using a three-dimensional scaffolding framework seeded with hundreds of millions of cardiac cells. If clinical applications prove successful, the technology could eliminate transplant waiting lists and rejection issues.',
    'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Nature Medicine', 'https://nature.com/medicine', 'Dr. Anna Lindqvist', 'health', 'SE', false, true, true,
    'hash_022', now() - interval '16 hours',
    'Karolinska researchers grew a fully functional human heart from stem cells in a lab, potentially solving organ transplant shortages.',
    ARRAY['medicine', 'stem cells', 'heart', 'transplant', 'biotech', 'breakthrough']
  ),
  (
    'World''s First Carbon-Negative City Completes Five-Year Transformation',
    'worlds-first-carbon-negative-city-transformation',
    'Copenhagen has officially achieved carbon-negative status, removing more CO2 from the atmosphere than it emits, five years ahead of its ambitious target.',
    'Copenhagen, Denmark''s capital city, became the world''s first carbon-negative city, officially removing more carbon dioxide from the atmosphere than the entire city emits annually, five years ahead of its target. The transformation involved converting 90% of the city''s heating to geothermal and offshore wind energy, implementing a comprehensive electric transportation network, planting 1.2 million trees and establishing urban forests, and deploying direct air capture technology across 200 locations. Mayor Sophie Hansen stated that Copenhagen now absorbs approximately 280,000 tonnes of CO2 annually beyond its total emissions. The city''s success is being studied by 40 other major cities planning similar transitions.',
    'https://images.pexels.com/photos/1796730/pexels-photo-1796730.jpeg?auto=compress&cs=tinysrgb&w=800',
    'The Guardian', 'https://theguardian.com', 'Lars Eriksen', 'science', 'DK', false, false, true,
    'hash_023', now() - interval '2 days',
    'Copenhagen became the world''s first carbon-negative city, absorbing 280,000 tonnes more CO2 annually than it emits through a comprehensive 5-year transformation.',
    ARRAY['climate', 'Copenhagen', 'carbon neutral', 'sustainability', 'green energy', 'environment']
  ),
  (
    'Streaming Wars Escalate as Mega-Merger Creates Entertainment Behemoth',
    'streaming-wars-mega-merger-entertainment-behemoth',
    'Two of the world''s largest streaming platforms announced a $180 billion merger that would create a combined service with over 800 million subscribers across 190 countries.',
    'Two of the world''s largest entertainment and streaming companies announced a $180 billion merger deal that would create the largest entertainment corporation in history with over 800 million combined subscribers across 190 countries. The merger, which requires regulatory approval in multiple jurisdictions, would combine vast libraries totaling over 100,000 hours of premium content, 15 sports rights packages, and original production capabilities spanning 50 countries. Regulators in the European Union and United States immediately announced competition investigations. Consumer advocacy groups expressed concerns about potential price increases and reduced competition.',
    'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Deadline', 'https://deadline.com', 'Jessica Park', 'entertainment', 'US', false, false, false,
    'hash_024', now() - interval '3 days',
    'Two streaming giants announced a $180B merger creating an 800M-subscriber platform, triggering antitrust investigations in the EU and US.',
    ARRAY['streaming', 'merger', 'entertainment', 'media', 'Netflix', 'competition']
  ),
  (
    'Cybersecurity Breach Exposes Data of 2 Billion Users Worldwide',
    'cybersecurity-breach-2-billion-users-data-exposed',
    'The largest data breach in internet history exposed personal data of approximately 2 billion users from a major technology platform, including passwords, financial data, and private communications.',
    'A catastrophic cybersecurity breach at a major global technology platform has exposed the personal data of approximately 2 billion users, making it the largest data breach in internet history by a significant margin. The compromised data includes email addresses, encrypted passwords, phone numbers, physical addresses, browsing history, private messages, and partial payment card information. The breach, perpetrated by an international hacking collective known as "Phantom Network," exploited a zero-day vulnerability in the platform''s authentication system. The attack went undetected for seven months. Regulators in 15 countries immediately launched investigations, and the platform faces potential fines that could reach $20 billion under various data protection laws.',
    'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Wired', 'https://wired.com', 'Kevin Nakamura', 'crime', 'US', true, false, true,
    'hash_025', now() - interval '5 hours',
    'A 2-billion-user data breach exposed passwords, financial data, and messages, with the attack undetected for 7 months. Regulators in 15 countries investigating.',
    ARRAY['cybersecurity', 'data breach', 'hacking', 'privacy', 'technology', 'crime']
  ),
  (
    'Genetic Therapy Reverses Aging Effects in Human Trial First',
    'genetic-therapy-reverses-aging-human-trial',
    'In a groundbreaking first-in-human clinical trial, a gene therapy targeting cellular aging mechanisms successfully reversed biological aging markers by an average of 15 years in participants.',
    'A landmark first-in-human clinical trial of a novel gene therapy targeting cellular aging mechanisms has produced extraordinary results, with participants showing an average reversal of biological aging markers equivalent to 15 years. The therapy, developed by biotech company AgeReverse Inc., uses an engineered adeno-associated viral vector to deliver modified copies of six telomerase-related genes directly to key organ systems. In the 50-person Phase 1 trial, participants aged 65-75 showed dramatic improvements in telomere length, mitochondrial function, cellular senescence markers, and organ-specific biomarkers of aging. Participants also reported subjective improvements in energy, cognitive function, and physical performance.',
    'https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg?auto=compress&cs=tinysrgb&w=800',
    'New England Journal of Medicine', 'https://nejm.org', 'Dr. Benjamin Yates', 'health', 'US', false, true, true,
    'hash_026', now() - interval '14 hours',
    'A gene therapy trial reversed biological aging by an average of 15 years in 50 participants aged 65-75, targeting telomerase and cellular senescence.',
    ARRAY['gene therapy', 'aging', 'longevity', 'medicine', 'biotech', 'clinical trial']
  ),
  (
    'Global Food Crisis Deepens as Extreme Weather Devastates Harvests',
    'global-food-crisis-extreme-weather-devastates-harvests',
    'A combination of unprecedented droughts and floods across five continents has destroyed an estimated 35% of global staple crop yields, triggering warnings of severe food insecurity.',
    'A confluence of extreme weather events across five continents has devastated global agricultural output, with the UN Food and Agriculture Organization estimating that 35% of global staple crop yields — including wheat, corn, rice, and soybeans — have been destroyed or severely compromised. The catastrophic harvest failures in key agricultural regions including the American Midwest, the Ganges Delta, Ukraine, and Southeast Asia have triggered sharp commodity price spikes, with wheat futures up 89% year-on-year. The World Food Programme warned that up to 400 million people face acute food insecurity over the next 12 months, with the most vulnerable populations concentrated in sub-Saharan Africa and South Asia.',
    'https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=800',
    'FAO', 'https://fao.org', 'Amara Diallo', 'world', 'CH', true, true, false,
    'hash_027', now() - interval '11 hours',
    'Extreme weather destroyed 35% of global staple crops, with 400 million people facing food insecurity and wheat futures up 89%.',
    ARRAY['food crisis', 'climate', 'agriculture', 'hunger', 'FAO', 'extreme weather']
  ),
  (
    'Moon Base Construction Begins Following Historic Treaty Agreement',
    'moon-base-construction-begins-international-treaty',
    'Construction of humanity''s first permanent lunar base began following an unprecedented international treaty signed by 47 space-faring nations agreeing to cooperative exploration.',
    'Construction of humanity''s first permanent lunar base officially commenced at the Shackleton Crater near the Moon''s south pole following the Artemis Accord Treaty signed by 47 nations. The international Moon Village project, coordinated by NASA, ESA, JAXA, and ISRO, will build a pressurized habitat capable of housing six researchers by 2029, expanding to 30 residents by 2035. The base will utilize lunar regolith for construction, extract water ice from permanently shadowed craters, and generate power through a combination of nuclear reactors and solar arrays. The project represents the largest international space cooperation effort since the International Space Station.',
    'https://images.pexels.com/photos/23769/pexels-photo-23769.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Space.com', 'https://space.com', 'Dr. Neil Robertson', 'discoveries', 'US', false, true, true,
    'hash_028', now() - interval '1 day',
    'Construction began on humanity''s first permanent Moon base at Shackleton Crater, under an international treaty between 47 nations.',
    ARRAY['moon', 'space', 'NASA', 'lunar base', 'international', 'exploration']
  ),
  (
    'Tennis Grand Slam Winner Makes Historic Comeback After Two-Year Injury',
    'tennis-grand-slam-winner-historic-comeback',
    'Former world No. 1 tennis star returned to competitive play after a devastating two-year injury absence, winning her first match back in emotional fashion at Roland Garros.',
    'Former world No. 1 tennis player Isabelle Fontaine made an emotional return to professional tennis at Roland Garros on Tuesday, winning her first match in 731 days following a devastating knee injury that required three surgical procedures. Fontaine, who won five Grand Slam titles before her injury, received a standing ovation from the Parisian crowd after her three-set victory. The 29-year-old was visibly moved, pausing at match point as tears streamed down her face. Her coach revealed that doctors had initially told Fontaine she had only a 15% chance of returning to professional competition. The comeback story has captivated the sporting world.',
    'https://images.pexels.com/photos/1277397/pexels-photo-1277397.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Tennis World', 'https://tennisworld.com', 'Antoine Mercier', 'sports', 'FR', false, false, true,
    'hash_029', now() - interval '20 hours',
    'Former world No. 1 tennis player Isabelle Fontaine won her first match in 731 days at Roland Garros after three surgeries and a 15% recovery prognosis.',
    ARRAY['tennis', 'Roland Garros', 'comeback', 'sports', 'Grand Slam', 'injury']
  ),
  (
    'Historic Ceasefire Reached in Middle East After Six Months of Conflict',
    'historic-ceasefire-middle-east-six-months-conflict',
    'After six months of devastating conflict, a comprehensive ceasefire brokered by Qatar and the United Nations has taken effect, with both sides agreeing to a pathway to peace talks.',
    'A comprehensive ceasefire in a major Middle Eastern conflict took effect at midnight GMT after exhaustive negotiations brokered jointly by Qatar and the United Nations. The agreement, which both parties signed in Doha following 72 hours of continuous final negotiations, provides for an immediate cessation of hostilities, exchange of hostages and prisoners, establishment of humanitarian corridors, and a 90-day period for substantive peace talks to begin. International observers from the US, EU, Russia, and China will monitor ceasefire compliance. Relief organizations immediately began mobilizing to deliver aid to areas cut off for months. The international community welcomed the agreement while cautioning that significant challenges remain.',
    'https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg?auto=compress&cs=tinysrgb&w=800',
    'Al Jazeera', 'https://aljazeera.com', 'Rania Khalil', 'wars-conflicts', 'QA', true, true, true,
    'hash_030', now() - interval '30 minutes',
    'A Qatar-UN brokered ceasefire ended 6 months of Middle East conflict, with hostage exchanges and 90-day pathway to peace talks.',
    ARRAY['ceasefire', 'Middle East', 'peace', 'conflict', 'Qatar', 'UN', 'diplomacy']
  )
) AS v(title, slug, excerpt, content, image_url, source_name, source_url, author, category_slug, country, is_breaking, is_featured, is_trending, url_hash, published_at, ai_summary, ai_tags)
ON CONFLICT (url_hash) DO NOTHING;

-- Update category_id for all articles based on category_slug
UPDATE articles a
SET category_id = c.id
FROM categories c
WHERE a.category_slug = c.slug AND a.category_id IS NULL;

-- Update article_count for categories
UPDATE categories c
SET article_count = (
  SELECT COUNT(*) FROM articles a WHERE a.category_slug = c.slug
);
