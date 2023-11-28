export let card = `
<div class="column is-6-tablet is-4-widescreen">
    <div class="card">
        <a href="./topik.html?id=#ID#">
            <div class="card-content">
                <div class="media">
                    <div class="media-content">
                        <p class="title is-4">#JUDUL#</p>
                        <p class="subtitle is-6">#SOURCE#</p>
                    </div>
                </div>
                <footer class="card-footer">
                    <span class="card-footer-item">
                        <ion-icon size="large" name="heart"></ion-icon>
                        #LOVE#
                    </span>
                    <span class="card-footer-item">
                        <ion-icon size="large" name="eye-outline"></ion-icon>
                        #VIEW#
                    </span>
                </footer>
            </div>
        </a>
    </div>
</div>
`

export let tabelTopic = `
<tr>
    <th>#NO#</th>
    <td>#TEXT#</td>
    <td>#SENTIMEN#</td>
</tr>
`