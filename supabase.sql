-- Create certificates table with all necessary fields
create table certificates (
    id uuid default gen_random_uuid() primary key,
    -- Header Information (these change per certificate)
    sample_id text unique not null,
    date_of_report date not null,
    description_of_sample text not null,
    sample_source text not null,
    submitted_by text not null,
    customer_contact text not null,
    sampled_by text not null,
    date_of_sampling date not null,
    date_sample_received date not null,
    date_of_analysis date not null,
    
    -- Test Results (only storing Results and Remarks as other values are constant)
    -- Physical Tests
    ph_result numeric(4,2),
    ph_remark text,
    turbidity_result numeric(4,2),
    turbidity_remark text,
    color_result text,
    color_remark text,
    tss_result text, -- total suspended solids
    tss_remark text,
    tds_result numeric(10,2), -- total dissolved solids
    tds_remark text,
    conductivity_result numeric(10,2),
    conductivity_remark text,

    -- Chemical Tests (Anions)
    ph_alkalinity_result text, -- phenolphthalein alkalinity
    ph_alkalinity_remark text,
    total_alkalinity_result numeric(10,2),
    total_alkalinity_remark text,
    chloride_result numeric(10,2),
    chloride_remark text,
    fluoride_result numeric(10,2),
    fluoride_remark text,
    sulfate_result text,
    sulfate_remark text,
    nitrate_result numeric(10,2),
    nitrate_remark text,
    nitrite_result numeric(10,4),
    nitrite_remark text,
    phosphate_result numeric(10,2),
    phosphate_remark text,
    sulfide_result numeric(10,3),
    sulfide_remark text,

    -- Chemical Tests (Cations)
    potassium_result numeric(10,2),
    potassium_remark text,
    calcium_result text,
    calcium_remark text,
    magnesium_result text,
    magnesium_remark text,
    iron_result numeric(10,3),
    iron_remark text,
    manganese_result numeric(10,3),
    manganese_remark text,
    ammonia_result text,
    ammonia_remark text,
    copper_result numeric(10,2),
    copper_remark text,
    zinc_result numeric(10,2),
    zinc_remark text,
    chromium_result numeric(10,2),
    chromium_remark text,

    -- Other Parameters
    total_hardness_result text,
    total_hardness_remark text,
    calcium_hardness_result text,
    calcium_hardness_remark text,
    magnesium_hardness_result text,
    magnesium_hardness_remark text,
    silica_result text,
    silica_remark text,
    free_chlorine_result numeric(10,2),
    free_chlorine_remark text,

    -- Metadata
    comments text,
    status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create RLS policies
alter table certificates enable row level security;

create policy "Enable read access for all users" on certificates
    for select using (true);

create policy "Enable insert access for authenticated users" on certificates
    for insert with check (auth.role() = 'authenticated');

create policy "Enable update access for authenticated users" on certificates
    for update using (auth.role() = 'authenticated'); 


    --Added afterwards
    -- Add microbiological test fields to certificates table
ALTER TABLE certificates
ADD COLUMN total_viable_counts_result text,
ADD COLUMN total_viable_counts_remark text,
ADD COLUMN coliforms_mpn_result text,
ADD COLUMN coliforms_mpn_remark text,
ADD COLUMN ecoli_mpn_result text,
ADD COLUMN ecoli_mpn_remark text,
ADD COLUMN faecal_coliforms_mpn_result text,
ADD COLUMN faecal_coliforms_mpn_remark text,
ADD COLUMN date_of_report_issue date not null default CURRENT_DATE;