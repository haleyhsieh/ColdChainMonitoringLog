Create a responsive B2B web application prototype titled “Cold Chain Monitoring Log.”

Use the two attached reference images:

1. Reference Image 1 shows the original Word-based Cold Chain Monitoring Log. Use its information structure and business context as the starting point.
2. Reference Image 2 shows the preferred visual direction: a clean enterprise dashboard with a teal primary color, white content surfaces, subtle borders, rounded cards, light gray backgrounds, restrained shadows, and high information readability.

## Project background

This cold-chain monitoring record originally existed only as a Word or Excel table. Redesign it as a modern web-based monitoring interface for international logistics coordinators.

The primary design purpose is to demonstrate:

* Internationalization and localization
* Chinese and English content switching
* Long translated text handling
* Metric and imperial unit conversion
* Date, time, and time-zone localization
* Responsive behavior on desktop, tablet, and mobile
* Accessible status communication that does not rely on color alone

This is an enterprise B2B interface, not a marketing website. Prioritize operational clarity, scannability, comparison of numerical data, and realistic logistics workflows.

## Required responsive frames

Create three responsive variants of the same page:

* Desktop Web: 1440 px wide
* Tablet: 768 px wide
* Mobile: 390 px wide

Use responsive Auto Layout and reusable components. Do not simply scale down the desktop layout.

Responsive behavior:

Responsive behavior:

- Desktop Web: Use a left navigation sidebar, a top header, summary metric cards, and full-width data tables. Use cards only for high-level shipment metrics. Keep monitoring logs and handling checks as tables because users need to scan and compare multiple records efficiently.

- Tablet: Collapse the sidebar into a menu button. Keep the table structure, but reduce the number of visible columns. Prioritize Timestamp, Location, Temperature, Humidity, and Status. Move secondary information such as Recorded By and Remarks into an expandable row or detail drawer. Allow horizontal scrolling only when necessary. Avoid excessive text wrapping and uncontrolled row heights.

- Mobile: Use a single-column layout for summary metric cards. Transform each monitoring-log table row into a compact stacked record card. Prioritize Timestamp, Location, Temperature, and Status, and reveal secondary information through an expandable section or detail drawer.

- Long product and project names must wrap naturally without overlapping or breaking the layout. On desktop and tablet, allow multiple lines when needed. On mobile, display a maximum of two or three lines with an expandable “Show more” interaction.

- Do not convert desktop or tablet monitoring tables into card grids merely for visual decoration. Preserve efficient comparison between records.
On mobile, transform each row into a stacked monitoring-record card.

## Navigation and page structure

Create a lightweight enterprise application shell.

Left navigation items:

* Dashboard
* Shipments
* Monitoring Logs
* Exceptions
* Reports
* Settings

Set “Monitoring Logs” as the active item.

Top header:

* Page title: Cold Chain Monitoring Log
* Shipment ID: #94829381-TX
* Language selector
* Measurement-system selector
* Time-zone selector
* Export button
* More actions menu

Use a globe icon or universal translation icon for the language selector. Never use national flags to represent languages.

## Language selector

Create an interactive language dropdown with:

* English
* 中文（繁體）
* 日本語 — Coming Soon

Only English and Traditional Chinese need to work in the prototype.

When the user switches languages:

* Translate navigation labels, headings, field labels, button text, helper text, statuses, and table headers.
* Replace the product/shipment name with the corresponding localized sample.
* Adjust text wrapping and layout naturally.
* Do not use fixed-width text containers that work only for English.
* Japanese must appear disabled or unavailable, with a small “Coming Soon” badge.

Traditional Chinese examples:

* Cold Chain Monitoring Log → 冷鏈監測日誌
* Monitoring Logs → 監測日誌
* Shipment Overview → 貨運概況
* Current Temperature → 目前溫度
* Current Humidity → 目前濕度
* Dimensions & Weight → 材積與重量
* Total Distance → 運輸總里程
* Last Check-in → 最後點檢時間
* Normal → 正常
* Exceptions & Deviations → 異常與偏差
* Handling Checks → 操作檢查
* Final Approval → 最終核准
* Export → 匯出

## Main shipment identity

Display a shipment overview card near the top of the page.

Traditional Chinese product/project name:

“抗體標靶藥物－阿達木單抗（40 毫克／0.8 毫升）－台北至法蘭克福 A 班次”

English long-name example:

“Adalimumab Anti-Inflammatory Biologic Injection (40 mg/0.8 mL) — Route: TPE-TPE01 to FRA-FRA04 — Shipment ID #94829381-TX”

Also display:

* Shipment ID: #94829381-TX
* Carrier: Global BioLogistics
* Transport mode: Air Freight
* Origin: Taipei, Taiwan — TPE-TPE01
* Destination: Frankfurt, Germany — FRA-FRA04
* Dispatch date
* Estimated arrival
* Shipment status: In Transit

The layout must remain stable when switching between the shorter Chinese content and the much longer English content.

## Monitoring summary cards

Create five summary cards:

### 1. Current Temperature

Metric:

* 2.5 °C
* Status: Normal / 正常

Imperial:

* 36.5 °F
* Status: Normal / 正常

Rules:

* Include a half-width space between the number and the temperature unit: “2.5 °C,” not “2.5°C.”
* Show a colored status indicator plus a text label.
* Never communicate status through color alone.
* Use an icon and text, such as a green dot plus “Normal.”
* Include a target range, such as “Target: 2–8 °C.”

### 2. Current Humidity

Display:

* 45.2 % RH

Humidity does not require unit conversion.

Support locale-aware numeric formatting as a design consideration:

* English/Chinese example: 45.2 % RH
* European locale example: 45,2 % RH

### 3. Dimensions & Weight

Metric:

* 120 × 80 × 160 cm
* 350.0 kg

Imperial:

* 47.2 × 31.5 × 63.0 in
* 771.6 lb

Use a proper multiplication symbol “×,” not the lowercase letter “x.”

### 4. Total Distance

Metric:

* 9,300 km

Imperial:

* 5,778.7 mi

### 5. Last Check-in

Taipei view:

* 2026/08/01 15:30
* GMT+8 · Taipei time

Berlin view:

* 01/08/2026 09:30
* GMT+2 · Berlin time

UTC view:

* 2026/08/01 07:30
* UTC

Always show the active time zone beside or directly below the timestamp.

Right-align numerical values where appropriate so logistics coordinators can compare values quickly.

## Measurement-system selector

Add a segmented control or dropdown in the page header:

* Metric
* Imperial

Metric values:

* 2.5 °C
* 120 × 80 × 160 cm
* 350.0 kg
* 9,300 km

Imperial values:

* 36.5 °F
* 47.2 × 31.5 × 63.0 in
* 771.6 lb
* 5,778.7 mi

Switch all relevant values together. Do not allow temperature, dimensions, weight, and distance to display inconsistent measurement systems.

Show the current measurement system clearly. The selector can follow the user’s global locale by default but must also allow an independent manual override.

## Time-zone selector

Add a clearly labeled time-zone selector at the top of the log:

* Viewer’s Local Time
* Shipment Location Time
* UTC

The selected option must update all timestamps in the monitoring log, exception records, and handling checks.

Time-zone and date-format rules:

* Asian format example: YYYY/MM/DD
* European format example: DD/MM/YYYY
* Always display the active time zone.
* Do not show an ambiguous timestamp without a time-zone label.

## Temperature readings log

Create a data table based on the original Word document.

Desktop and tablet columns:

* Timestamp
* Location
* Temperature
* Humidity
* Status
* Recorded By
* Remarks

Create at least five realistic sample records from Taipei dispatch through Frankfurt transit.

Include different states:

* Normal
* Warning
* Temperature Excursion
* Sensor Offline

Status badges must combine:

* Icon
* Text label
* Color

Examples:

* Check icon + Normal
* Warning triangle + Warning
* Alert icon + Temperature Excursion
* Disconnected sensor icon + Sensor Offline

On mobile, transform each row into a stacked monitoring-record card. Place timestamp, location, temperature, and status first, followed by secondary information.

Add:

* Search field
* Status filter
* Date-range filter
* Sort control
* “View details” row action

## Exceptions and deviations

Create an “Exceptions & Deviations” section.

Show one realistic example:

* Event: Temperature exceeded the target range
* Recorded value: 9.1 °C
* Target range: 2–8 °C
* Duration: 12 minutes
* Location: Frankfurt Cargo Terminal
* Status: Under Review
* Corrective action: Inspection requested

Also design an empty state for shipments with no deviations:

* Icon
* “No temperature deviations or incidents recorded.”
* Traditional Chinese equivalent: “目前沒有溫度偏差或異常事件。”

## Handling checks

Create a handling-check table with:

* Check Time
* Checklist Item
* Compliance
* Checked By
* Notes

Use accessible compliance labels:

* Compliant
* Non-compliant
* Pending Review

Do not use only “Yes/No” or only colored dots.

## Final approval

Create a final approval card containing:

* Approved By
* Approval Date
* Approval Status
* Reviewer Notes

Example status:

* Pending Final Approval

Include a disabled or secondary “Approve Record” button to show that approval is unavailable until all exceptions are resolved.

Add explanatory helper text:

“All unresolved exceptions must be reviewed before final approval.”

## Visual direction

Follow the visual character of Reference Image 2:

* Enterprise B2B dashboard
* Teal as the primary brand color
* White cards on a very light gray background
* Thin neutral borders
* Rounded corners around 10–14 px
* Minimal, soft shadows
* Clear typography hierarchy
* Calm and trustworthy appearance
* Compact but not crowded
* Use a modern sans-serif typeface
* Use line icons with consistent stroke weight
* Avoid decorative illustrations, glassmorphism, excessive gradients, or oversized dashboard graphics

Suggested palette:

* Primary teal: approximately #07998A
* Dark teal for hover and active states
* Light teal background for selected navigation and informational badges
* Neutral gray borders and secondary text
* Green for normal status
* Amber for warnings
* Red for excursions or critical states
* Gray for offline or unavailable states

Use colors accessibly and maintain sufficient contrast.

## Component and interaction requirements

Create reusable components with variants for:

* Language selector
* Measurement-system selector
* Time-zone selector
* Status badge
* Summary metric card
* Table header and row
* Mobile record card
* Filter control
* Primary and secondary buttons
* Empty state
* Disabled action
* Tooltip

Prototype these interactions:

1. Switch between English and Traditional Chinese.
2. Display Japanese as disabled with a “Coming Soon” label.
3. Switch between metric and imperial measurements.
4. Switch between viewer local time, shipment location time, and UTC.
5. Expand and collapse the long shipment name on mobile.
6. Filter monitoring records by status.
7. Open a monitoring-record detail panel or modal.

The result should look like a realistic enterprise cold-chain operations product and clearly demonstrate how a legacy Word/Excel record can be transformed into a responsive, localized, accessible web interface.
