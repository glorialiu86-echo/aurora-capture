# G2 ChangeSet

## Summary
- firstedition_total: 319
- final_total: 200
- guide_firstedition_lines: 203..294
- guide_final_lines: 205..251
- rest_matched: 173
- unmatched_firstedition: 115
- unmatched_final: 26
- conflicts_zh: 0
- conflicts_en: 0

## Guide Block
- guide_firstedition_lines: 203..294
- guide_final_lines: 205..251
- old_zh_preview: 📖 工具介绍
关闭
工具应该怎么使用？
输入经纬度，系统会自动读取你当前所在的时间与时区，生成极光观测预告。
【1 小时精准】
以 10 分钟为粒度，即时回答：
「我现在要不要出门？要不要架机？」
【3 小时预测】
呈现逐小时状态，选出最适合观测极光的一个小时。
同时告诉你当前极光是处在爆发中还是已衰落，并回答：
「接下来 3 小时值不值得守？」
【72 小时范围】
引入更多 CH 与 CME 日冕物质抛射的信息，以天为单位，预测极光爆发的可能性。
从更宏观的数据视角，回答：
「未来三天，哪一天最值得安排时间？」
极光预测，为什么不能只是 KP？
KP 是为全球空间天气监测而设计的宏观指标。
…
- new_zh_preview: 【Guide｜整篇文案（冻结）】
- old_en_preview: MISSING
MISSING
MISSING
MISSING
MISSING
MISSING
MISSING
MISSING
MISSING
MISSING
MISSING
MISSING
MISSING
MISSING
MISSING
MISSING
MISSING
MISSING
MISSING
MISSING
MISSING
MISSING
MISSING
MISSING
MISSING
MISSING
MISSING
MISSING
MISSING
MISSING
MISSING
- new_en_preview: ## How It Works

### How to Use

Enter coordinates and Aurora Capture will automatically use your local time and time zone to generate an observing briefing.

**【Now】**
Updated every 10 minutes to answer:
“Should I head out now? Is it worth setting up?”

**【Next 3 Hours】**
Shows hour-by-hour conditi…
- note: Guide is treated as a block-level replacement (type=GUIDE_BLOCK).

## Conflicts
- None

## zh_map

## en_map
- Fetching data… -> ['Notice: Fetching data…'] @ [{'first_idx': 142, 'final_idx': 89}]
- Generation failed: check console for details. -> ['⚠️ Error: Forecast failed. Check console for details.'] @ [{'first_idx': 149, 'final_idx': 113}]
- Location acquired -> ['Location Acquired'] @ [{'first_idx': 147, 'final_idx': 108}, {'first_idx': 269, 'final_idx': 107}]
- Location acquired (accuracy ~ ${m}m) -> ['Location Acquired ${accTxt}'] @ [{'first_idx': 180, 'final_idx': 133}]
- Moon altitude -> ['Moon elevation'] @ [{'first_idx': 33, 'final_idx': 26}]
- To save favorites across devices, please log in once. -> ['To save locations across devices, please log in once.'] @ [{'first_idx': 105, 'final_idx': 67}]
- fading after outburst -> ['Fading After Surge'] @ [{'first_idx': 129, 'final_idx': 84}]
- in outburst -> ['Surge in Progress'] @ [{'first_idx': 127, 'final_idx': 81}, {'first_idx': 273, 'final_idx': 82}]
- outburst building -> ['Surge Building'] @ [{'first_idx': 128, 'final_idx': 83}]
- stand in silence -> ['Silent'] @ [{'first_idx': 126, 'final_idx': 80}]
- strongly recommended -> ['Strongly Recommended'] @ [{'first_idx': 38, 'final_idx': 31}, {'first_idx': 134, 'final_idx': 88}]
- unobservable -> ['Unobservable'] @ [{'first_idx': 46, 'final_idx': 39}, {'first_idx': 48, 'final_idx': 41}]
- wait-and-observe -> ['Standby'] @ [{'first_idx': 42, 'final_idx': 35}, {'first_idx': 131, 'final_idx': 86}]
- worth going out -> ['Worth Going Out'] @ [{'first_idx': 40, 'final_idx': 33}, {'first_idx': 130, 'final_idx': 85}]
- ⚠️ Coordinates out of range -> ['⚠️ Error: Coordinates out of range.'] @ [{'first_idx': 140, 'final_idx': 97}]
- ⚠️ Invalid coordinates -> ['⚠️ Error: Invalid coordinates.'] @ [{'first_idx': 187, 'final_idx': 96}]
- ⚠️ Invalid location returned -> ['⚠️ Error: Invalid coordinates returned from location services.'] @ [{'first_idx': 136, 'final_idx': 99}]
- ⚠️ Location error -> ['⚠️ Error: Location processing failed.'] @ [{'first_idx': 137, 'final_idx': 98}]
- ⚠️ Low MLAT: only extreme events may work -> ['⚠️ Warning: MLAT is low. Only extreme events may work.'] @ [{'first_idx': 163, 'final_idx': 95}]
- ⚠️ MLAT limit: unobservable -> ['⚠️ Warning: This is a hard geographic limit. Unobservable.'] @ [{'first_idx': 161, 'final_idx': 94}]
- ⚠️ MLAT too low: generation stopped -> ['⚠️ Warning: MLAT is too low. Forecast generation has been stopped.'] @ [{'first_idx': 143, 'final_idx': 93}]
- ⚠️ Solar wind source unavailable: entered weak mode (conservative) -> ['⚠️ Warning: Solar wind data source unavailable. Entered conservative mode.'] @ [{'first_idx': 144, 'final_idx': 111}]
- ⚠️ Unable to get location -> ['⚠️ Error: Location acquisition failed.'] @ [{'first_idx': 138, 'final_idx': 91}]
- ✍️ Generate prediction -> ['✍️ Run forecast'] @ [{'first_idx': 157, 'final_idx': 103}]
- ⭐ Save address -> ['⭐ Save location'] @ [{'first_idx': 155, 'final_idx': 100}]
- 🌟 Favorites -> ['🌟 Saved Locations'] @ [{'first_idx': 9, 'final_idx': 4}]
- 📍 Refresh location -> ['📍 Re-acquire location'] @ [{'first_idx': 153, 'final_idx': 102}]

## Unmatched
- firstedition:
  - 3: zh=现在要不要出门追光？一键给出观测窗口 | en=MISSING
  - 4: zh=MISSING | en=TEST / STAGING
  - 5: zh=MISSING | en=TEST / STAGING
  - 6: zh=MISSING | en=Aurora Capture logo
  - 7: zh=MISSING | en=Aurora Capture
  - 14: zh=MISSING | en=Trans OFF
  - 15: zh=MISSING | en=Trans Toggle
  - 27: zh=1小时精准 | en=MISSING
  - 28: zh=3小时预测 | en=MISSING
  - 29: zh=72小时范围 | en=MISSING
  - 34: zh=1小时 C值（Capture）柱状图 | en=MISSING
  - 44: zh=【C值2】低概率 | en=low probability
  - 54: zh=72小时范围预测 | en=MISSING
  - 59: zh=等待生成。 | en=Waiting…
  - 60: zh=72小时结论分级（C值） | en=MISSING
  - 67: zh=数据源：NOAA SWPC（实时太阳风、OVATION nowcast、Kp 预报）与 Open-Meteo 云量预报。磁纬（MLAT）当前为估算（偶极近似）；若接入 AACGMv2 换算服务，将自动切换为真实 AACGMv2。 | en=MISSING
  - 106: zh=登录后，你收藏的地点就可以在不同设备上使用啦 🌟 | en=After logging in, your saved locations will be available across devices 🌟
  - 108: zh=邮箱 | en=MISSING
  - 111: zh=🌟 收藏夹 | en=🌟 Favorites
  - 112: zh=关闭 | en=MISSING
  - 116: zh=关闭 | en=MISSING
  - 119: zh=地点名称 | en=Location name
  - 121: zh=取消 | en=Cancel
  - 122: zh=⚠️ 数据可信度提醒 | en=⚠️ Data reliability notice
  - 123: zh=关闭 | en=MISSING
  - 132: zh=低概率 | en=low probability
  - 133: zh=不可观测 | en=unobservable
  - 135: zh=📍 正在获取当前位置… | en=Getting current location…
  - 145: zh=⚠️ 数据可信度提醒 | en=⚠️ Data reliability notice
  - 146: zh=📍 定位失败 | en=📍 Location failed
  - 148: zh=已生成。 | en=Generated.
  - 154: zh=📍 获取当前位置 | en=📍 Get current location
  - 156: zh=⭐ 收藏 | en=⭐ Save
  - 158: zh=✍️ 生成即时预测 | en=MISSING
  - 159: zh=📍获取位置 | en=MISSING
  - 160: zh=已获取 ✓ | en=Acquired ✓
  - 165: zh=当前时段不建议投入。 | en=MISSING
  - 174: zh=📍 无法获取定位 | en=📍 Unable to get location
  - 178: zh=定位返回的经纬度无效，请重试或手动输入。 | en=MISSING
  - 181: zh=定位成功返回，但处理坐标时发生异常。请重试或手动输入。 | en=MISSING
  - 182: zh=定位失败，请重试或手动输入。 | en=MISSING
  - 183: zh=你拒绝了定位授权。请在浏览器设置中允许定位后重试。 | en=MISSING
  - 184: zh=暂时无法获取定位（信号弱/系统未开启定位服务）。 | en=MISSING
  - 185: zh=获取定位超时，请稍后重试。 | en=MISSING
  - 186: zh=获取定位时发生异常，请重试或手动输入。 | en=MISSING
  - 188: zh=请输入数字格式的纬度/经度。 | en=MISSING
  - 192: zh=⚠️ 经纬度超出范围 | en=⚠️ Coordinates out of range
  - 199: zh=KP … | en=MISSING
  - 203: zh=KP — | en=MISSING
  - 207: zh=磁纬过低，已停止生成 | en=MLAT too low. Generation stopped
  - 217: zh=${del.count}/3 成立 | en=MISSING
  - 218: zh=Bt平台${okBt} ・ 速度背景${okV} ・ 密度结构${okN} | en=MISSING
  - 222: zh=Kp峰值≈ | en=MISSING
  - 241: zh=强烈推荐 | en=strongly recommended
  - 242: zh=值得出门 | en=worth going out
  - 243: zh=可蹲守 | en=wait-and-observe
  - 244: zh=低概率 | en=low probability
  - 245: zh=不可观测 | en=unobservable
  - 250: zh=爆发进行中 | en=in outburst
  - 252: zh=爆发概率上升 | en=outburst building
  - 254: zh=爆发后衰落期 | en=fading after outburst
  - 256: zh=静默 | en=stand in silence
  - 261: zh=云量 | en=Cloud cover
  - 262: zh=月角 | en=Moon altitude
  - 263: zh=更新时间 | en=Updated
  - 264: zh=新鲜度 | en=Data freshness
  - 265: zh=太阳风 | en=Solar wind
  - 266: zh=已生成。 | en=Generated.
  - 268: zh=已获取 ✓ | en=Acquired ✓
  - 270: zh=已获取当前位置 | en=Location acquired
  - 271: zh=静默 | en=stand in silence
  - 272: zh=爆发进行中 | en=in outburst
  - 274: zh=爆发概率上升 | en=outburst building
  - 275: zh=爆发后衰落期 | en=fading after outburst
  - 276: zh=值得出门 | en=worth going out
  - 277: zh=可蹲守 | en=wait-and-observe
  - 278: zh=低概率 | en=low probability
  - 279: zh=不可观测 | en=unobservable
  - 280: zh=拉取数据中… | en=Fetching data…
  - 281: zh=等待生成。 | en=Waiting…
  - 282: zh=定位中 | en=📍 Getting current location…
  - 283: zh=无法定位 | en=📍 Unable to get location
  - 284: zh=数据可信度 | en=⚠️ Data reliability notice
  - 285: zh=⚠️ 磁纬过低：已停止生成 | en=⚠️ MLAT too low: generation stopped
  - 286: zh=磁纬过低，已停止生成 | en=MLAT too low. Generation stopped
  - 287: zh=⚠️ 磁纬限制：不可观测 | en=⚠️ MLAT limit: unobservable
  - 288: zh=⚠️ 磁纬较低：仅极端事件才可能 | en=⚠️ Low MLAT: only extreme events may work
  - 289: zh=⚠️ 经纬度输入无效 | en=⚠️ Invalid coordinates
  - 290: zh=⚠️ 经纬度超出范围 | en=⚠️ Coordinates out of range
  - 291: zh=⚠️ 定位处理异常 | en=⚠️ Location error
  - 292: zh=⚠️ 定位返回无效坐标 | en=⚠️ Invalid location returned
  - 293: zh=🌟 收藏夹 | en=🌟 Favorites
  - 294: zh=⭐ 收藏 | en=⭐ Save
  - 295: zh=⭐ 收藏地址 | en=⭐ Save address
  - 296: zh=📍 获取当前位置 | en=📍 Get current location
  - 298: zh=📍 刷新定位 | en=📍 Refresh location
  - 299: zh=✍️ 生成预测 | en=✍️ Generate prediction
  - 300: zh=需要登录 | en=Login required
  - 302: zh=取消 | en=Cancel
  - 303: zh=收藏地点 | en=Save location
  - 304: zh=地点名称 | en=Location name
  - 305: zh=当前坐标 | en=Current coordinates
  - 306: zh=保存 | en=Save
  - 307: zh=重命名 | en=Rename
  - 308: zh=删除 | en=Delete
  - 309: zh=还没有收藏的地点。先生成或输入一个地点，再点击 ⭐ 收藏 | en=No saved locations yet. Generate or enter a location, then tap ⭐ Save.
  - 310: zh=为了跨设备保存收藏位置，需要登录一次。 | en=To save favorites across devices, please log in once.
  - 311: zh=登录后，你收藏的地点就可以在不同设备上使用啦 🌟 | en=After logging in, your saved locations will be available across devices 🌟
  - 312: zh=经纬度无效，无法收藏。 | en=Invalid coordinates. Unable to save.
  - 313: zh=该地点已在收藏中，如需修改请先删除后重建。 | en=This location is already saved. Delete it before saving again.
  - 314: zh=请输入地点名称。 | en=Please enter a location name.
  - 315: zh=—— @小狮子佑酱 | en=—— @小狮子佑酱
  - 316: zh=MISSING | en=Destination coordinates: you can get lat/long by dropping a pin in Apple Maps or Google Maps, then copying the latitude & longitude from the place details.
  - 317: zh=MISSING | en=Trans ON
  - 318: zh=MISSING | en=Trans OFF
- final:
  - 20: zh=现在 | en=Now
  - 21: zh=未来 3 小时 | en=Next 3 Hours
  - 22: zh=未来 3 天 | en=Next 3 Days
  - 27: zh=1小时 C值柱状图 | en=1-hour Forecast (C) Bar Chart
  - 37: zh=【C值2】希望不大 | en=Unlikely to See
  - 47: zh=未来 3 天范围预测 | en=Next 3 Days Outlook
  - 52: zh=未来 3 天结论分级（C值） | en=3-Day Outlook (C Value)
  - 59: zh=数据源：NOAA SWPC（实时太阳风、OVATION nowcast、Kp 预报）与 Open-Meteo 云量预报。磁纬（MLAT）当前为估算（偶极近似）。 | en=Data sources: NOAA SWPC (real-time solar wind, OVATION nowcast, Kp forecast) and Open-Meteo cloud forecast. MLAT is currently estimated (dipole approximation).
  - 68: zh=登录后，你收藏的地点就可以在不同设备上使用啦！ | en=After logging in, your saved locations will be available across devices.
  - 87: zh=希望不大 | en=Unlikely to See
  - 90: zh=正在获取当前位置… | en=Notice: Getting current location…
  - 92: zh=⚠️ 数据可信度警告 | en=⚠️ Data Reliability Warning
  - 105: zh=已生成 | en=Forecast Ready
  - 112: zh=⚠️ 定位失败 | en=⚠️ Error: Location acquisition failed.
  - 117: zh=📍 获取位置 | en=📍 Get location
  - 131: zh=⚠️ 定位返回的经纬度无效，请重试或手动输入。 | en=⚠️ Error: Invalid coordinates returned from location services. Please re-acquire or enter coordinates manually.
  - 134: zh=⚠️ 定位成功返回，但处理坐标时发生异常。请重试或手动输入。 | en=⚠️ Error: Location succeeded, but processing the coordinates failed. Please re-acquire or enter coordinates manually.
  - 135: zh=⚠️ 定位失败，请重试或手动输入。 | en=⚠️ Error: Location acquisition failed. Please re-acquire or enter coordinates manually.
  - 136: zh=⚠️ 你拒绝了定位授权。请在浏览器设置中允许定位后重试。 | en=⚠️ Error: Location permission was denied. Please enable location access in your browser settings, then re-acquire.
  - 137: zh=⚠️ 暂时无法获取定位（信号弱/系统未开启定位服务）。 | en=⚠️ Error: Unable to acquire location (weak signal or location services are disabled).
  - 138: zh=⚠️ 获取定位超时，请稍后重试。 | en=⚠️ Error: Location acquisition timed out. Please re-acquire later, or enter coordinates manually.
  - 139: zh=⚠️ 获取定位时发生异常，请重试或手动输入。 | en=⚠️ Error: An error occurred while acquiring location. Please re-acquire or enter coordinates manually.
  - 140: zh=⚠️ 请输入数字格式的纬度/经度。 | en=⚠️ Error: Please enter numeric values for latitude and longitude.
  - 150: zh=Kp … | en=Kp …
  - 154: zh=Kp — | en=Kp —
  - 171: zh=Kp 峰值≈ | en=Kp Peak ≈