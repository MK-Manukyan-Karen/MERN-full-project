export const email = value => {
   if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return 'Ձեր էլեկտրոնային հասցեն սխալ է';
   }
   return undefined;
};


export const required = message => value => {
   if (value) {
      return undefined;
   }
   return message;
}


export const maxLength = max => value => {

   if (value && value.length > max) {
      return `Առավելագույն քանակը ${max} նիշ`;
   }
   return undefined;
};

export const minLength = min => value => {

   if (value && value.length < min) {
      return `Նվազագույն քանակը ${min} նիշ է`;
   }
   return undefined;
};

