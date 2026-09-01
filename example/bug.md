2. fl-table 在不同浏览器对：border-collapse:collapse;渲染的不同
    **问题：**

        对于chorme，每个tr的td会正常显示border-bottom
        对于firfox,只有最后一个tr的td会显示border-bottom

    **原因:**

        在 HTML <table> 表格中，浏览器有两种处理单元格（td）边框的方式：
        分离模式（默认，border-collapse: separate）： 每个 td 都有自己独立的边框。如果你在 CSS 里给 td 设了 border-bottom: 1px solid ...，那每个 td 都会乖乖显示这个底边框。
        合并模式（border-collapse: collapse）： 相邻单元格的边框会合并成一个边框。在 Firefox 中，当处于合并模式时，它对 border-bottom 的渲染逻辑与 Chrome 不同。Firefox 经常会因为“边框共享”机制，认为中间的 tr 的底边框是下面一行 tr 的顶边框，从而导致中间行的 border-bottom 在视觉上被“吞掉”或隐藏，只保留最后一个 tr 的底边框（因为它是整个表格的最底端）。

    **解决：**

        border-collapse:separate; //设置为分离模式，这样每个 td 的 border-bottom 都会独立渲染
        border-spacing:0; //默认的边框间距是 2px，你需要手动改回 0

3. fl-form-item的 label也可以配置是否垂直居中
