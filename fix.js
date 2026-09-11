const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

const newStr = `          </form>
        </div>
      </div>
    </div>
  )}
{/* ========== FOOTER ========== */}`;

code = code.replace(/<\/form>[\s\S]*?\{\/\* ========== FOOTER ========== \*\/\}/, newStr);

fs.writeFileSync('src/app/page.tsx', code);
console.log('Done replacement');
